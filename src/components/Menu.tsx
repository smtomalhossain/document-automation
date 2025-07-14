"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { adminMenu } from "@/app/lib/adminMenu";
import { userMenu } from "@/app/lib/userMenu";
import { PaymentRequestData } from "@/app/lib/data"; // 🔹 import payment data

const Menu = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user.sms");
    if (userData) {
      const parsed = JSON.parse(userData);
      setRole(parsed.role); // "school_admin" or other roles
    }
  }, []);

  const selectedMenu = role === "school_admin" ? adminMenu : userMenu;

  if (!role) return null;

  // 🔹 Filter only pending requests
  const pendingCount = PaymentRequestData.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <div className="mt-7">
      {selectedMenu.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.items.map((item, itemIndex) => {
            const isActive = pathname === item.href;
            const isPaymentMenu = item.label === "পেমেন্ট রিকোয়েস্ট";

            return (
              <ul
                key={itemIndex}
                className="flex flex-col items-start m-0 p-0 py-1"
              >
                <li className="w-[16.25rem] my-[0.0625rem] relative">
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-[0.625rem] mx-4 rounded-md transition-colors duration-300 text-[0.9375rem] font-normal ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-[#566a7f] hover:bg-blue-200 hover:text-blue-500"
                    }`}
                  >
                    <span className="w-6 mr-2 text-[1.25rem] flex-shrink-0">
                      <item.icon />
                    </span>
                    <span className="font-extrabold">{item.label}</span>
                  </Link>

                  {/* 🔔 Top-right badge for পেমেন্ট রিকোয়েস্ট */}
                  {isPaymentMenu && pendingCount > 0 && (
                    <span className="absolute top-1 right-5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
