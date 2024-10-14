"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define form validation schema
const feedbackSchema = z.object({
  courseId: z.string().nonempty("Course is required"), // Dropdown for course selection
  courseRating: z.number().min(1).max(5).int().optional(),
  quizRating: z.number().min(1).max(5).int().optional(),
  instructorRating: z.number().min(1).max(5).int().optional(),
  contentRating: z.number().min(1).max(5).int().optional(),
  satisfaction: z.number().min(1).max(5).int().optional(),
  comments: z.string().optional(),
});

function FeedbackForm() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Array<{ id: string; title: string }> | null>(null);

  // Fetch the list of courses from the backend
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data); // Assuming response data contains an array of courses
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }

    fetchCourses();
  }, []);

  // React Hook Form setup
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      courseId: "",
      courseRating: undefined,
      quizRating: undefined,
      instructorRating: undefined,
      contentRating: undefined,
      satisfaction: undefined,
      comments: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // Submit handler
  const onSubmit = async (values: z.infer<typeof feedbackSchema>) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error("User is not authenticated.");
        return;
      }

      await axios.put("/api/feedback", {
        ...values,
        userId: user.id,
      });

      toast.success("Feedback submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 md:p-10 bg-secondary/50 text-secondary-foreground md:rounded-3xl container max-w-3xl h-full flex flex-col items-start justify-center">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Feedback Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6 w-full">
          {/* Dropdown for course selection */}
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Course</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Courses</SelectLabel>
                        {courses?.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other form fields */}
          <FormField
            control={form.control}
            name="courseRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rate the course"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quizRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rate the quiz"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructorRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rate the instructor"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contentRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Relevance Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rate content relevance"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="satisfaction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satisfaction Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rate satisfaction"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your comments..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-end gap-2 ml-auto">
            <Link href="/dashboard" type="button" className={buttonVariants({ variant: "ghost" })}>
              Cancel
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting || isLoading}>
              {isLoading ? <Loader2 className="mr-1 animate-spin p-1" /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default FeedbackForm;
