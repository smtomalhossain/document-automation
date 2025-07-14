"use client";

import React, { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import Pagination from "@/components/Pagination";
import Table from "@/components/Tabel";
import Modal from "@/components/Modal";
import { UsersListData } from "@/app/lib/data";

type Assignments = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const columns = [
  { header: "Serial", accessor: "id" },
  { header: "Name", accessor: "name", className: "hidden md:table-cell" },
  { header: "Email", accessor: "email", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions", className: "text-right" },
];

const UserListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState<{
    type: "delete" | null;
    data: Assignments | null;
  }>({ type: null, data: null });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = useMemo(() => {
    return UsersListData.filter((user) =>
      `${user.name} ${user.email} ${user.phone}`.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm]);

  const openModal = (type: "delete", data: Assignments) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  const getModalContent = () => {
    const { type, data } = modal;
    if (!type || !data) return null;

    return (
      <>
        <p>আপনি কি নিশ্চিতভাবে <strong>{data.name}</strong> কে মুছে ফেলতে চান?</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          হ্যাঁ, ডিলিট করুন
        </button>
      </>
    );
  };

  const renderRow = (item: Assignments) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-300 transition-colors duration-200"
    >
      <td className="p-4">{item.id}</td>
      <td className="hidden md:table-cell">{item.name}</td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="text-right">
        <div className="flex justify-end items-center gap-3 mx-2">
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className="text-lg font-semibold">All Users</h1>
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Table columns={columns} renderRow={renderRow} data={filteredUsers} />
      <Pagination />

      <Modal
        isOpen={modal.type !== null}
        title="Confirm Delete"
        content={getModalContent()}
        onClose={closeModal}
      />
    </div>
  );
};

export default UserListPage;
