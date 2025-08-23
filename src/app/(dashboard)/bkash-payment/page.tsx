"use client";

import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import Cookies from "js-cookie";

const BkashRecharge = () => {
  const [amount, setAmount] = useState("");
  const [trxId, setTrxId] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bkashNumber, setBkashNumber] = useState("");
  // const [notice, setNotice] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    fetch(`${apiUrl}/app-setting/bkash_number`)
      .then((res) => res.json())
      .then((data) => setBkashNumber(data.value || ""));
    // fetch(`${apiUrl}/app-setting/notice`)
    //   .then((res) => res.json())
    //   .then((data) => setNotice(data.value || ""));
  }, []);

  const handleRecharge = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("অনুগ্রহ করে একটি সঠিক পরিমাণ লিখুন");
      return;
    }
    if (!trxId.trim()) {
      alert("অনুগ্রহ করে একটি ট্রানজেকশন আইডি লিখুন");
      return;
    }
    setLoading(true);
    setSuccess(false);
    try {
      const token = Cookies.get("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/bkash-recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          trxId,
          bkashNo: bkashNumber,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "রিচার্জ ব্যর্থ হয়েছে");
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAmount("");
        setTrxId("");
      }, 3000);
    } catch (error: any) {
      alert(error.message || "রিচার্জ ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/bkash.svg" alt="bKash Logo" width={120} height={40} />
        </div>
        {/* Notice Board */}
        {/* {notice && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-center">
            {notice}
          </div>
        )} */}
        {/* Send Money Info */}
        <div className="text-center text-sm text-gray-600 mb-4">
          Send money to this number:
          <span className="font-bold text-[#E2136E] block text-lg">
            {bkashNumber || "Loading..."}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#E2136E]">
          bKash রিচার্জ করুন
        </h2>
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
            ✅ সফলভাবে {amount} টাকা রিচার্জ সম্পন্ন হয়েছে!
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            পরিমাণ লিখুন (৳)
          </label>
          <input
            type="number"
            placeholder="উদাহরণ: ২০০"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E2136E] text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            bKash Transaction ID
          </label>
          <input
            type="text"
            placeholder="উদাহরণ: 4A5B9X9Y8Z"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E2136E] text-black"
          />
        </div>
        <button
          onClick={handleRecharge}
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-[#E2136E] hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-md transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              প্রসেস হচ্ছে...
            </>
          ) : (
            "রিচার্জ করুন"
          )}
        </button>
      </div>
    </div>
  );
};

export default BkashRecharge;
