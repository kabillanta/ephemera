import { pusherServer } from '@/lib/pusher'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text, roomId, username } = await req.json()

  // REVERTED: Back to standard public channel
  await pusherServer.trigger(`room-${roomId}`, 'incoming-message', {
    text,
    username,
    timestamp: Date.now(),
  })

  return NextResponse.json({ success: true })
}