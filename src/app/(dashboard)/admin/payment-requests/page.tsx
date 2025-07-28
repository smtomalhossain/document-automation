"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Pagination from "@/components/Pagination";
import Table from "@/components/Tabel";
import Modal from "@/components/Modal";
import Cookies from "js-cookie";

type PaymentRequest = {
  id: number;
  email: string;
  amount: number;
  transactionId: string;
  status: "pending" | "approved" | "rejected";
};

type ModalState = {
  type: "approve" | "reject" | null;
  data: PaymentRequest | null;
};

const columns = [
  { header: "Serial", accessor: "id" },
  { header: "Email", accessor: "email", className: "hidden md:table-cell" },
  { header: "Amount", accessor: "amount", className: "hidden md:table-cell" },
  { header: "Transaction Id", accessor: "transactionId", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions", className: "text-right" },
];

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Add a type guard for status
function isValidStatus(status: string): status is "pending" | "approved" | "rejected" {
  return ["pending", "approved", "rejected"].includes(status);
}

const PaymentRequestPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<PaymentRequest[]>([]);
  const [modal, setModal] = useState<ModalState>({ type: null, data: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchRecharges = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/bkash-recharge/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("auth_token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch payment requests");
        const recharges = await res.json();
        const mapped: PaymentRequest[] = [];
        for (const item of recharges) {
          const statusRaw = item.status.toLowerCase();
          if (isValidStatus(statusRaw)) {
            const status: "pending" | "approved" | "rejected" = statusRaw;
            const paymentRequest: PaymentRequest = {
              id: item.id,
              email: item.user?.email || "",
              amount: item.amount,
              transactionId: item.trxId,
              status,
            };
            mapped.push(paymentRequest);
          }
        }
        setData(mapped);
      } catch (err: any) {
        setError(err.message || "Error fetching payment requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRecharges();
  }, [apiUrl]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      `${item.email} ${item.amount} ${item.status}`.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm, data]);

  const openModal = (type: "approve" | "reject", item: PaymentRequest) => {
    setModal({ type, data: item });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  const updateRechargeStatus = async (id: number, status: "APPROVED" | "REJECTED") => {
    setLoading(true);
    setError(null); 
    try {
      const res = await fetch(`${apiUrl}/bkash-recharge/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("auth_token")}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: updated.status } : item
        )
      );
    } catch (err: any) {
      setError(err.message || "Error updating status");
    } finally {
      setLoading(false);
    }
  };

  const confirmAction = async () => {
    if (!modal.data || !modal.type) return;
    await updateRechargeStatus(modal.data.id, modal.type === "approve" ? "APPROVED" : "REJECTED");
    closeModal();
  };

  const getModalContent = () => {
    if (!modal.data || !modal.type) return null;

    const actionText = modal.type === "approve" ? "Approve" : "Reject";
    const color = modal.type === "approve" ? "green" : "red";

    return (
      <>
        <p>
          Are you sure you want to{" "}
          <strong className={`text-${color}-600`}>{actionText.toLowerCase()}</strong> the
          payment request of <strong>{modal.data.email}</strong>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className={`bg-${color}-600 text-white px-4 py-2 rounded hover:bg-${color}-700`}
          >
            Yes, {actionText}
          </button>
        </div>
      </>
    );
  };

  const renderRow = (item: PaymentRequest) => {
    const isHandled = item.status !== "pending";

    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-300 transition-colors duration-200"
      >
        <td className="p-4">{item.id}</td>
        <td className="hidden md:table-cell">{item.email}</td>
        <td className="hidden md:table-cell">{item.amount}৳</td>
        <td className="hidden md:table-cell">{item.transactionId}</td>
        <td className="hidden md:table-cell">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
              item.status
            )}`}
          >
            {item.status}
          </span>
        </td>
        <td className="text-right">
          <div className="flex justify-end items-center gap-2 mx-2">
            <button
              disabled={isHandled}
              onClick={() => openModal("approve", item)}
              className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${isHandled
                  ? "bg-green-300 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            >
              <FaCheckCircle /> Approve
            </button>
            <button
              disabled={isHandled}
              onClick={() => openModal("reject", item)}
              className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${isHandled
                  ? "bg-red-300 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
                }`}
            >
              <FaTimesCircle /> Reject
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className="text-lg font-semibold">Payment Requests</h1>
        <input
          type="text"
          placeholder="Search by email, amount or status..."
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <div className="text-center py-8">Loading payment requests...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <>
          <Table columns={columns} renderRow={renderRow} data={filteredData} />
          <Pagination />
        </>
      )}
      <Modal
        isOpen={modal.type !== null}
        title={
          modal.type === "approve" ? "Confirm Approval" : "Confirm Rejection"
        }
        content={getModalContent()}
        onClose={closeModal}
      />
    </div>
  );
};

export default PaymentRequestPage;
