"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  department: z.string().min(1, {
    message: "Department is required.",
  }),
  role: z.string().min(1, {
    message: "Role is required.",
  }),
});

function UserForm() {
  const router = useRouter();
  const { user } = useUser(); // Access the authenticated user details
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      role: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // Populate form fields with user data after authentication
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.fullName || "", // Clerk's user data
        email: user.primaryEmailAddress?.emailAddress || "",
        department: "", // Let the user fill this
        role: "", // Let the user fill this
      });
    }
  }, [user, form]);

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Ensure the user object exists before accessing its properties
      if (!user) {
        toast.error("User is not authenticated.");
        return;
      }

      if (!isEditing) {
        // First-time submission (creating a new employee record)
        await axios.post("/api/employees", {
          ...values,
          UserId: user.id, // Add Clerk user ID to the request
        });
        toast.success("Details submitted successfully!");
        setIsEditing(true); // Set to editing mode after first submission
      } else {
        // Editing the form after submission
        await axios.put(`/api/employees/${user.id}`, values); // Update user details
        toast.success("Details updated successfully!");
      }

      // Optionally, redirect or refresh data here
      router.push("/dashboard"); // Redirect to homepage or dashboard after submission
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 md:p-10 bg-secondary/50 text-secondary-foreground md:rounded-3xl container max-w-3xl h-full flex flex-col items-start justify-center">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
        Complete your profile
      </h1>
      <p className="text-muted-foreground mt-1 text-sm sm:text-base">
        Fill in your details below. You can edit them later if needed.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} disabled={isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Marketing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Manager" {...field} />
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

export default UserForm;
