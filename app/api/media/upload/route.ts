import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@/lib/auth/config'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'audio/mpeg', 'audio/wav']

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const folderName = session?.user?.id || 'uploads'
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const experienceId = formData.get('experienceId') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine resource type
    const isVideo = file.type.startsWith('video/')
    const isAudio = file.type.startsWith('audio/')
    const resourceType: 'image' | 'video' | 'raw' = isVideo ? 'video' : isAudio ? 'raw' : 'image'

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `memoire/${folderName}`,
          resource_type: resourceType,
          transformation: resourceType === 'image' ? [
            { quality: 'auto:good', fetch_format: 'auto' },
          ] : undefined,
          eager: resourceType === 'image' ? [
            { width: 400, crop: 'scale', quality: 'auto:low', fetch_format: 'auto' },
          ] : undefined,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl: result.eager?.[0]?.secure_url || result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}

export const config = {
  api: { bodyParser: false },
}
