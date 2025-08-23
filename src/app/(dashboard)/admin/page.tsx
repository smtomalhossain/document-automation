"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [bkashNumber, setBkashNumber] = useState("");
  const [WhatsAppNumber, setWhatsAppNumber] = useState("");
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    fetch(`${apiUrl}/app-setting/bkash_number`)
      .then((res) => res.json())
      .then((data) => setBkashNumber(data.value || ""));
    fetch(`${apiUrl}/app-setting/whatsapp_number`)
      .then((res) => res.json())
      .then((data) => setWhatsAppNumber(data.value || ""));
    fetch(`${apiUrl}/app-setting/notice`)
      .then((res) => res.json())
      .then((data) => setNotice(data.value || ""));
  }, []);

  const handleSaveNumber = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const token = Cookies.get("auth_token");
    const res = await fetch(`${apiUrl}/app-setting/bkash_number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ value: bkashNumber }),
    });
    if (res.ok) {
      setSuccess("Bkash Number saved successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } else {
      setSuccess("Failed to save Bkash Number");
    }
  };

  const handleSaveWhatsAppNumber = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const token = Cookies.get("auth_token");
    const res = await fetch(`${apiUrl}/app-setting/whatsapp_number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ value: WhatsAppNumber }),
    });
    if (res.ok) {
      setSuccess("WhatsApp Number saved successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } else {
      setSuccess("Failed to save WhatsApp Number");
    }
  };

  const handleChangeNotice = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const token = Cookies.get("auth_token");
    const res = await fetch(`${apiUrl}/app-setting/notice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ value: notice }),
    });
    if (res.ok) {
      setSuccess("Notice changed successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } else {
      setSuccess("Failed to change notice");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mx-4 p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-center">
            {success}
          </div>
        )}
        <div className="mb-6">
          <label
            htmlFor="bkashNumber"
            className="block mb-2 font-semibold text-gray-700"
          >
            Change Bkash Number
          </label>
          <input
            type="text"
            id="bkashNumber"
            value={bkashNumber}
            onChange={(e) => setBkashNumber(e.target.value)}
            placeholder="Enter new Bkash number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSaveNumber}
            type="button"
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save Number
          </button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="WhatsAppNumber"
            className="block mb-2 font-semibold text-gray-700"
          >
            Change WhatsApp Number
          </label>
          <input
            type="text"
            id="WhatsAppNumber"
            value={WhatsAppNumber}
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            placeholder="Enter new WhatsApp number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSaveWhatsAppNumber}
            className="mt-3 bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Change WhatsApp
          </button>
        </div>
        <div>
          <label
            htmlFor="noticeBoard"
            className="block mb-2 font-semibold text-gray-700"
          >
            Notice Board
          </label>
          <textarea
            id="noticeBoard"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            placeholder="Write your notice here..."
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleChangeNotice}
            type="button"
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Change Notice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
