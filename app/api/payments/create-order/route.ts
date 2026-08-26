import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/db/client'
import Razorpay from 'razorpay'
import { z } from 'zod'
import { nanoid } from 'nanoid'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const createOrderSchema = z.object({
  plan: z.enum(['PREMIUM', 'PREMIUM_PLUS', 'BUNDLE']),
  experienceId: z.string().optional(),
})

const PLAN_AMOUNTS: Record<string, number> = {
  PREMIUM: Number(process.env.NEXT_PUBLIC_PRICE_PREMIUM) || 19900,
  PREMIUM_PLUS: Number(process.env.NEXT_PUBLIC_PRICE_PREMIUM_PLUS) || 59900,
  BUNDLE: Number(process.env.NEXT_PUBLIC_PRICE_BUNDLE) || 99900,
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = createOrderSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { plan, experienceId } = parsed.data
    const amountPaise = PLAN_AMOUNTS[plan]

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `rcpt_${nanoid(8)}`,
      notes: {
        userId: session.user.id,
        plan,
        experienceId: experienceId || '',
      },
    })

    // Save order to DB
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${nanoid(10).toUpperCase()}`,
        userId: session.user.id,
        experienceId: experienceId || null,
        plan: plan as any,
        status: 'PENDING',
        amountPaise,
        razorpayOrderId: razorpayOrder.id,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    )
  }
}
