import {
  MdLogout,
  MdNotifications,
  MdPeople,
  MdPersonAdd,
  MdRequestPage,
  MdDashboard, // Add this import
} from "react-icons/md";

export const adminMenu = [
  {
    title: "অ্যাডমিন মেনু",
    items: [
      { icon: MdDashboard, label: "ড্যাশবোর্ড", href: "/admin" },  // <-- Added dashboard
      { icon: MdPeople, label: "ইউজার লিস্ট", href: "/admin/users" },
      { icon: MdPersonAdd, label: "ইউজার তৈরি করুন", href: "/admin/create-user" },
      { icon: MdRequestPage, label: "পেমেন্ট রিকোয়েস্ট", href: "/admin/payment-requests" },
     
      { icon: MdLogout, label: "লগআউট", href: "/logout" },
    ],
  },
];
