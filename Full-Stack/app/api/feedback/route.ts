import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { userId } = auth(); // Extract userId from auth
    const { courseRating, quizRating, instructorRating, contentRating, comments ,satisfaction,courseId} = await req.json();

    // Validate the input
    if (!userId) {
      return new NextResponse("User not authenticated", { status: 401 });
    }

    if (courseRating == null || quizRating == null || instructorRating == null || contentRating == null) {
      return new NextResponse("All ratings are required", { status: 400 });
    }

    // Create a new feedback entry
    const feedback = await db.feedback.create({
      data: {
        userId,
        courseId, // Ensure userId is a string
        courseRating,
        quizRating,
        instructorRating,
        contentRating,
        satisfaction,
        comments: comments || null, // Optional comments
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("[FEEDBACK POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const feedbacks = await db.feedback.findMany();
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("[FEEDBACK GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
