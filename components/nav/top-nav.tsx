"use client";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { useUsage } from "@/context/usage";

const TopNav = () => {
  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();
  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Toaster />
      <Link href="/">
        <Image src="/logo.svg" alt="logo" height={50} width={100} />{" "}
      </Link>
      {!subscribed && (
        <Link href="/membership">
          🎆Join free or Upgrade for 9.99 DKK/month
        </Link>
      )}
      <Link href="/genai">Gen AI</Link>
      <div className="flex items-center justify-between">
        {isSignedIn && (
          <Link href="/dashboard" className="mr-2">
            {`${user.fullName}`}'s Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
