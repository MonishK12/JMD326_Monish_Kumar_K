// /app/api/quiz/scores/route.ts
import { db } from "@/lib/db"; // Adjust the import based on your db configuration
import { auth } from "@clerk/nextjs"; // Import Clerk's auth function
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Authenticate the user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // Handle unauthorized access
    }

    const { score, attempt } = await req.json();

    // Validate the input
    if (score === undefined || attempt === undefined) {
      return new NextResponse("Score and Attempt are required", { status: 400 });
    }

    // Store the score in the database
    const quizScore = await db.quizScore.create({
      data: {
        userId,
        score,
        attempt,
      },
    });

    return NextResponse.json(quizScore, { status: 201 });
  } catch (error) {
    console.error("[QUIZ SCORE POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
