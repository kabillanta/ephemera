import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { roomId } = await req.json()
  
  const exists = await redis.exists(`room:${roomId}`)
  
  if (!exists) {
    return NextResponse.json({ exists: false }, { status: 404 })
  }

  return NextResponse.json({ exists: true })
}