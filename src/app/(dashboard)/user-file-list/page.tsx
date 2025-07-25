"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Tabel";
import Modal from "@/components/Modal";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";

type Assignments = {
  id: string;
  serialNo: string;
  khatianNo: string;
  CreateDate: string;
};

const columns = [
  { header: "SL", accessor: "id" },
  { header: "Serial No", accessor: "serialNo", className: "hidden md:table-cell" },
  { header: "Khatian No.", accessor: "khatianNo", className: "hidden md:table-cell" },
  { header: "Date", accessor: "CreateDate", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions", className: "text-right" },
];

const UserFileListPage = () => {
  const [data, setData] = useState<Assignments[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{
    type: "download" | "edit" | "delete" | null;
    data: Assignments | null;
  }>({ type: null, data: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/land-forms");
        const json = await res.json();
        const mapped = json.map((item: any, index: number) => ({
          id: (index + 1).toString(),
          serialNo: item.serial_no,
          khatianNo: item.khatian_no,
          CreateDate: item.date_english,
        }));
        setData(mapped);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (type: "download" | "edit" | "delete", data: Assignments) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  const getModalContent = () => {
    const { type, data } = modal;
    if (!type || !data) return null;

    switch (type) {
      case "download":
        return (
          <>
            <p>আপনি কি <strong>{data.serialNo}</strong> সিরিয়াল নাম্বারটি ডাউনলোড করতে চান?</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ডাউনলোড করুন
            </button>
          </>
        );
      case "edit":
        return (
          <>
            <p><strong>{data.khatianNo}</strong> খতিয়ান এডিট করতে চান?</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              কনফার্ম এডিট
            </button>
          </>
        );
      case "delete":
        return (
          <>
            <p>আপনি কি নিশ্চিতভাবে <strong>{data.serialNo}</strong> মুছে ফেলতে চান?</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              হ্যাঁ, ডিলিট করুন
            </button>
          </>
        );
    }
  };

  const renderRow = (item: Assignments) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-300 transition-colors duration-200"
    >
      <td className="p-4">{item.id}</td>
      <td className="hidden md:table-cell">{item.serialNo}</td>
      <td className="hidden md:table-cell">{item.khatianNo}</td>
      <td className="hidden md:table-cell">{item.CreateDate}</td>
      <td className="text-right">
        <div className="flex justify-end items-center gap-3 mx-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 cursor-pointer"
            onClick={() => openModal("download", item)}
          >
            <FaDownload /> Download
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 cursor-pointer"
            onClick={() => openModal("edit", item)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 cursor-pointer"
            onClick={() => openModal("delete", item)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">All Files</h1>
      </div>

      {loading ? (
        <p className="text-center p-6">Loading...</p>
      ) : (
        <>
          <Table columns={columns} renderRow={renderRow} data={data} />
          <Pagination />
        </>
      )}

      <Modal
        isOpen={modal.type !== null}
        title={
          modal.type === "download"
            ? "Download"
            : modal.type === "edit"
              ? "Edit"
              : modal.type === "delete"
                ? "Delete"
                : ""
        }
        content={getModalContent()}
        onClose={closeModal}
      />
    </div>
  );
};

export default UserFileListPage;
