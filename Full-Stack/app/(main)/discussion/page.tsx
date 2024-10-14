import { getCourses } from "@/actions/get-courses";
import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import { redirect } from "next/navigation";
import Discussion from "./_components/discussion";


interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Searchpage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Fetch categories and courses
  const categories = await db.category.findMany();
  const courses = await getCourses({
    userId: userId,
    ...searchParams,
  });

  // Find the selected category by ID to pass its name to the Discussion component
  const selectedCategory = categories.find(
    (category) => category.id === searchParams.categoryId
  );
  const categoryName = selectedCategory ? selectedCategory.name : "General"; // Default to 'general' if category not found

  return (
    <>
      <Categories items={categories} />
      <div className="px-6 overflow-y-scroll bg-secondary mx-0 md:mx-auto py-6 rounded-none md:h-[calc(100vh-170px)] md:rounded-none md:rounded-bl-3xl md:mt-1 md:rounded-tl-xl container">      
      {/* Pass the category name to the Discussion component */}
      <Discussion category={categoryName} />
      </div>
    </>
  );
};

export default Searchpage;
