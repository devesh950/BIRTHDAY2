import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/db/client'
import crypto from 'crypto'
import { z } from 'zod'

const verifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  orderId: z.string(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = verifySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = parsed.data

    // Verify signature (CRITICAL — never trust client-side payment success)
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex')

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // Fetch order and verify ownership
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { experience: true },
    })

    if (!order || order.userId !== session.user.id) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status === 'PAID') {
      return NextResponse.json({ success: true, already: true })
    }

    // Update order to PAID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        razorpayPaymentId,
        razorpaySignature,
      },
    })

    // Upgrade experience plan
    if (order.experienceId) {
      await prisma.experience.update({
        where: { id: order.experienceId },
        data: { plan: order.plan },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed. Contact support.' },
      { status: 500 }
    )
  }
}
