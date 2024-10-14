// /app/api/employees/route.ts
import { db } from "@/lib/db"; // Adjust the import based on your db configuration
import { auth } from "@clerk/nextjs"; // Import Clerk's auth function
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Authenticate the user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // Handle unauthorized access
    }

    const { name, email, department, role,UserId } = await req.json();

    // Validate the input
    if (!name || !email || !department || !role) {
      return new NextResponse("Name, Email, Department, and Role are required", { status: 400 });
    }

    // Create a new employee
    const employee = await db.employee.create({
      data: {
        name,
        userId,
        email,
        department,
        role,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("[EMPLOYEES POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth(); // Authenticate the user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // Handle unauthorized access
    }

    // Fetch all employees
    const employees = await db.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("[EMPLOYEES GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
