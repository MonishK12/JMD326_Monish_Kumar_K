import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {userId} = auth();
    const {title, author} = await req.json();
    
    if(!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        author
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log("[COURSES]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}

export async function GET(req: Request) {
  try {
    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // Handle unauthorized access
    }

    // Fetch all courses from the database
    const courses = await db.course.findMany({
      select: {
        id: true,        // Select only id and title, can add more fields if needed
        title: true,
      },
    });

    return NextResponse.json(courses); // Return the courses as JSON
  } catch (error) {
    console.error("[COURSES GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}