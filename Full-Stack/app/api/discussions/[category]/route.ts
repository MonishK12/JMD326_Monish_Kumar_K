// app/api/discussions/[category]/route.ts

import { db } from "@/lib/db"; // Adjust the import path according to your project structure
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }:any) {
  const { category } = params;

  try {
    const messages = await db.message.findMany({
      where: {
        discussionId: category,
      },
      orderBy: {
        createdAt: "asc", // Order messages by creation time
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[FETCHING MESSAGES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { discussionId, userId, content ,userName,avatarUrl} = await req.json();

  try {
    const newMessage = await db.message.create({
      data: {
        discussionId,
        userId,
        content,
        userName,
        avatarUrl
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("[POSTING MESSAGE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
