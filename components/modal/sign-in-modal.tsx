"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SignInModal = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      openSignIn();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between border border-slate-300 rounded-full bg-transparent px-4 py-2 w-1/2 mx-auto mb-4 hover:bg-slate-700 hover:bg-opacity-50"
    >
      <span className="text-slate-100">🔥 Join free membership</span>
      <span className="bg-slate-500 text-slate-100 rounded-full w-8 h-8 flex items-center justify-center">
        <ChevronRight />
      </span>
    </div>
  );
};

export default SignInModal;
