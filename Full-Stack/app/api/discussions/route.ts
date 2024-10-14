import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust according to your database setup

export async function POST(request: Request) {
  const { discussionId, userId, content,userName,avatarUrl } = await request.json();

  try {
    const message = await db.message.create({
      data: {
        discussionId,
        userId,
        content,
        userName,
        avatarUrl
      },
    });
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "Error sending message" }, { status: 500 });
  }
}
