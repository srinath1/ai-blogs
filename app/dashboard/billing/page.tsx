"use client";
import React from "react";
import { createCustomerPortalSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";

const BillingPage = () => {
  const handleClick = async () => {
    const response = await createCustomerPortalSession();
    window.location.href = response as string;
  };
  return (
    <div>
      <div
        className="p-10 mb-5 rounded-lg bg-gradient-to-r from-slate-200 
    via-slate-300 to-slate-400 dark:from-slate-800 dark:via-slate-700 dark:to
    slate-600 flex flex-col justify-center items-center"
      >
        <h1 className="text-xl">Billing</h1>
        <p className="text-sm text-gray-500">Manage your subscription plan</p>
      </div>
      <div className="p-5">
        <Button onClick={handleClick}>Access Stripe Customer Portal</Button>
      </div>
    </div>
  );
};

export default BillingPage;
