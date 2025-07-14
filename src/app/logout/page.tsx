"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Install if not already: npm i js-cookie

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove cookie
    Cookies.remove("user.sms");

    // Optional: small delay before redirecting
    setTimeout(() => {
      router.replace("/login");
    }, 500);
  }, [router]);

  return <p className="text-center mt-20">Logging out...</p>;
}
