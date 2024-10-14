"use client";

import { ArrowLeft, BarChart, Compass, List, Plus,BookCheck, MessagesSquareIcon, MessageCircleIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { MdOutlineLeaderboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { BiShoppingBag } from "react-icons/bi";
import { FaBusinessTime } from "react-icons/fa6";

const guestRoutes = [
  {
    icon: PiStudent,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/search"
  },
  {
    icon: MdOutlineLeaderboard,
    label: "Info Form",
    href: "/userform"
  },
  {
    icon: MessagesSquareIcon,
    label: "Feedback",
    href: "/feedback"
  },
  {
    icon: BookCheck,
    label: "Quiz",
    href: "/quiz"
  },
  {
    icon: MessageCircleIcon,
    label: "Discussions",
    href: "/discussion"
  },
]
const adminRoutes = [
  {
    icon: ArrowLeft,
    label: "Employee Dashboard",
    href: "/dashboard"
  },
  {
    icon: Plus,
    label: "Create a Course",
    href: "/admin/create"
  },
  {
    icon: List,
    label: "My Courses",
    href: "/admin/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics"
  },
  {
    icon: FaBusinessTime,
    label: "Employees",
    href: "/admin/employees"
  },
  {
    icon: BookCheck,
    label: "Quiz",
    href: "/admin/quiz"
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTecacherPage = pathname?.includes("/admin");
  const routes = isTecacherPage ? adminRoutes : guestRoutes;

  return ( 
    <div className={cn("flex flex-col w-full py-6 gap-2")}>
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
   );
}
 
export default SidebarRoutes;