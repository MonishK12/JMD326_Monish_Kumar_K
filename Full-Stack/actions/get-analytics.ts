import { db } from "@/lib/db";
import { Course, Employee } from "@prisma/client";

type CourseWithEnrollments = Course & {
  _count: {
    purchases: number; // Assuming a purchase relates to enrollment
  };
};

export const getAnalytics = async (userId: string) => {
  try {
    const totalEmployees = await db.employee.count();
    
    const totalCourses = await db.course.count();

    const enrollments = await db.purchase.findMany({
      include: {
        course: true,
      },
    });

    const employeeEnrollment = enrollments.length; // Count of all enrollments

    // Grouping course enrollments
    const groupedEarnings = enrollments.reduce((acc, curr) => {
      const courseTitle = curr.course.title;
      acc[courseTitle] = (acc[courseTitle] || 0) + 1; // Count enrollments per course
      return acc;
    }, {} as { [courseTitle: string]: number });

    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    return {
      data,
      totalEmployees,
      totalCourses,
      employeeEnrollment,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalEmployees: 0,
      totalCourses: 0,
      employeeEnrollment: 0,
    };
  }
};
