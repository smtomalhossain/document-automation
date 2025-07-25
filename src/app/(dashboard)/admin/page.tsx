"use client";

import React, { useState } from "react";

const Page = () => {
  const [bkashNumber, setBkashNumber] = useState("");
  const [notice, setNotice] = useState("");

  const handleSaveNumber = () => {
    alert(`Bkash Number saved: ${bkashNumber}`);
  };

  const handleChangeNotice = () => {
    alert(`Notice changed: ${notice}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mx-4 p-6 bg-white rounded-lg shadow-md max-w-md w-full">
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
