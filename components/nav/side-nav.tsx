"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Usage from "./usage";
import SignUpModal from "../modal/sign-up-modal";
export default function SideNav() {
  const path = usePathname();
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/setting",
    },
  ];
  return (
    <div className="flex flex-col h-full ">
      <div className=" flex-1 space-y-2">
        {menu.map((item, index) => (
          <ul
            key={index}
            className={`flex m-2 mr-1 p-2  hover:text-white 
    rounded-lg cursor-pointer ${
      path === item.path
        ? "bg-primary text-white"
        : "hover:bg-primary hover:text-white"
    }`}
          >
            <div className="flex justify-center items-center md:justify-start w-full">
              <Link href={item.path} className="flex">
                <item.icon />
                <span className="ml-2  md:inline">{item.name}</span>
              </Link>
            </div>
          </ul>
        ))}
      </div>
      <div className="pb-20 mt-auto">
        <Usage />
        <SignUpModal />
      </div>
    </div>
  );
}
