import { redis } from '@/lib/redis'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST() {
  const roomId = nanoid(10) // Generate unique ID
  
  // Create room with a 10-minute (600s) expiration (TTL)
  // We just store a simple boolean, the key existence is what matters
  await redis.set(`room:${roomId}`, 'active', { ex: 600 })

  return NextResponse.json({ roomId })
}