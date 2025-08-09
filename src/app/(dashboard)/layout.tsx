"use client";

import { usePathname } from "next/navigation";
import Menu from "@/components/Menu";
import Navbar from "@/components/Nevbar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide layout on /login and /test pages
  const hideLayout = pathname === "/login" || pathname === "/test";

  // If path starts with /admin, link to /admin, else to /create-new-file
  const isAdmin = pathname.startsWith("/admin");
  const linkHref = isAdmin ? "/admin" : "/create-new-file";

  return (
    <div className="h-screen flex">
      {/* LEFT MENU */}
      {!hideLayout && (
        <div className="hidden lg:block lg:w-[20%] xl:w-[20%] bg-white-200 shadow-md p-4">
          <Link href={linkHref} className="flex items-center justify-center gap-2">
            <span className="hidden lg:block font-bold">ONLINE SEBA</span>
          </Link>
          <Menu />
        </div>
      )}

      {/* RIGHT PANEL */}
      <div
        className={`w-full ${
          !hideLayout ? "lg:w-[84%] xl:w-[84%]" : ""
        } bg-[#F7F8FA] overflow-scroll flex flex-col`}
      >
        {!hideLayout && <Navbar />}
        {children}
      </div>
    </div>
  );
}
