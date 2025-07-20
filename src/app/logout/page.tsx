"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Install if not already: npm i js-cookie
import { toast } from 'react-toastify';


export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    logout();
  }, [router]);

  const logout = () => {
  // Remove JWT token and user info
  Cookies.remove('auth_token');
  Cookies.remove('user.sms');

  // Optional: Clear remembered user (if stored)
  localStorage.removeItem('rememberedUser');

  // Optional: Show a toast
  toast.success('Logged out successfully', { autoClose: 1000 });

  // Redirect to login or home page
  setTimeout(() => {
    window.location.href = '/login'; // Change if needed
  }, 1200);
};

  return <p className="text-center mt-20">Logging out...</p>;
}
