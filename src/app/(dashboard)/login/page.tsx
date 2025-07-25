"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "anik@gmail.com",
    password: "123456",
  });

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedUser");
    if (remembered) {
      const saved = JSON.parse(remembered);
      setFormData(saved);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleLogin = async () => {
  setLoading(true);
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.username, // assuming email is used as username
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Save token (JWT)
    Cookies.set("auth_token", data.token, { expires: rememberMe ? 7 : undefined });

    // You may decode the token to get role or user info
    const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
    const role = tokenPayload.role || "user"; // make sure role is included in token

    // Save extra user info if needed
    Cookies.set("user.sms", JSON.stringify({ id: tokenPayload.userId, role }));

    if (rememberMe) {
      localStorage.setItem("rememberedUser", JSON.stringify(formData));
    } else {
      localStorage.removeItem("rememberedUser");
    }

    toast.success("Login Successful!", { autoClose: 1000 });

    setTimeout(() => {
      // Redirect based on role
      console.log(role);
        window.location.href = "/admin";
      
      // if (role === "school_admin") {
      //   window.location.href = "/admin";
      // } else if (role === "file_creator") {
      //   window.location.href = "/create-new-file";
      // } else {
      //   window.location.href = "/dashboard";
      // }
    }, 1200);
  } catch (err: any) {
    toast.error(err.message || "Login error", { autoClose: 3000 });
  } finally {
    setLoading(false);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center"
      onKeyDown={handleKeyPress}
    >
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* Left image */}
        <div className="md:w-1/2 bg-blue-600 text-white p-6 hidden md:flex flex-col justify-center items-center">
          <Image
            src="/Login.png"
            alt="Login"
            width={300}
            height={300}
            className="rounded"
          />
          <h2 className="text-2xl font-bold mt-4">Welcome Back!</h2>
          <p className="text-sm mt-2 text-center px-4">
            Log in to access your dashboard.
          </p>
        </div>

        {/* Right form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <span
                className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
