"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "./Menu";
import Cookies from "js-cookie";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
                const token = Cookies.get("auth_token");

                const res = await fetch(`${apiUrl}/user/get-user`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setEmail(data.email || null);

                // Fetch account balance
                const balRes = await fetch(`${apiUrl}/user/account-balance`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!balRes.ok) throw new Error("Failed to fetch balance");
                const balData = await balRes.json();
                setBalance(balData.balance);
            } catch (err: any) {
                setError("Could not load user or balance");
                setEmail(null);
                setBalance(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="mx-4 mt-4 rounded-md shadow-md flex items-center justify-between bg-white p-4 relative z-10">
            {/* SEARCH BAR */}
            <div className="flex items-center gap-5 justify-start w-full">
                <GiHamburgerMenu
                    onClick={handleClick}
                    className="text-3xl lg:hidden cursor-pointer text-gray-500"
                />
                <div className="bg-gray-700 flex items-center gap-2 text-xs rounded-md px-3 p-1">
                    <h4 className="text-white text-sm">
                        {loading ? "Loading..." : error ? error : email || "No email"}
                    </h4>
                </div>
            </div>

            {/* ICONS AND USER */}
            <div className="gap-2 flex items-center md:gap-5 justify-end w-full">
                <div className="bg-red-500 p-1 rounded-md">
                    <h4 className="text-white text-sm">
                        {loading ? "Loading..." : error ? error : balance !== null ? `TK:${balance}` : "TK:0"}
                    </h4>
                </div>
            </div>

            {/* Sidebar Overlay & Slide Panel */}
            <div
                className={`fixed inset-0 z-50  transition-opacity duration-300 md:hidden ${isMenuOpen ? "bg-opacity-50 pointer-events-auto" : "bg-opacity-0 pointer-events-none"
                    }`}
                onClick={handleClick}
            >
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Logo and Close Button */}
                    <div className="flex justify-between items-center mb-4 px-4 py-4">
                        <Link href="/admin" className="flex items-center gap-2">
                            <Image src="/logo.png" alt="logo" width={32} height={32} />
                            <span className="font-bold">ONLINE SEBA</span>
                        </Link>
                        <button
                            onClick={handleClick}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <AiOutlineClose className="text-2xl" />
                        </button>
                    </div>

                    {/* Sidebar Menu */}
                    <Menu />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
