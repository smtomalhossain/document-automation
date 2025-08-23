// menuData.ts
import {
  MdCreateNewFolder,
  MdFolderOpen,
  MdPayment,
  MdSupportAgent,
  MdLogout,
} from "react-icons/md";

// Regular user menu
export const userMenu = [
  {
    title: "USER MENU",
    items: [
      {
        icon: MdCreateNewFolder,
        label: "ক্রিয়েট ফাইল",
        href: "/create-new-file",
      },
      { icon: MdFolderOpen, label: "ফাইল লিস্ট", href: "/user-file-list" },
      { icon: MdPayment, label: "বিকাশ অটো রিচার্জ", href: "/bkash-payment" },
      {
        icon: MdSupportAgent,
        label: "সাপোর্ট",
        href: "https://wa.me/",//+447446961037
      },
      { icon: MdLogout, label: "লগআউট", href: "/logout" },
    ],
  },
];

// Admin menu

