import { DataTable } from "./_components/data-table";
import { quizColumns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db"; // Adjust this import to your actual db path
import { QuizScore } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server"; // Import Clerk's server-side client

const QuizzesPage = async () => {
  const { userId } = auth(); // Fetch userId from Clerk
  if (!userId) {
    return redirect("/"); // Redirect if userId is not found
  }

  // Fetch quizzes for the user
  const quizzes: QuizScore[] = await db.quizScore.findMany({
    orderBy: { createdAt: "desc" }, // Order quizzes by creation date
  });

  // Fetch user names from Clerk using the userId in each quiz
  const quizzesWithUserNames = await Promise.all(
    quizzes.map(async (quiz) => {
      const user = await clerkClient.users.getUser(quiz.userId); // Fetch user details from Clerk
      return {
        ...quiz,
        userName: user?.firstName || "Anonymous", // Add user name (fallback to Anonymous if not available)
      };
    })
  );

  return (
    <div className="p-6 md:p-12 bg-secondary/50 text-secondary-foreground min-h-[calc(100vh-80px)] md:rounded-tl-3xl">
      <div className="flex flex-col mb-8 gap-2">
        <h1 className="text-4xl font-bold">Your Quizzes</h1>
        <p className="text-muted-foreground">Here is a list of all your quizzes</p>
      </div>
      <DataTable columns={quizColumns} data={quizzesWithUserNames} /> {/* Pass the updated data */}
    </div>
  );
};

export default QuizzesPage;
