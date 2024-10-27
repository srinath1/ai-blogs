"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import { checkUserSusbcription } from "@/actions/stripe";
interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscribed: boolean;
}

const UsageContext = createContext<UsageContextType | null>(null);
export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (email) {
      fetchUsage();
      fetchSubscription();
    }
  }, [email]);

  useEffect(() => {
    if (
      !subscribed &&
      count > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
    ) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [count, subscribed]);

  const fetchUsage = async () => {
    const response = await usageCount(email);
    setCount(response);
  };
  const fetchSubscription = async () => {
    const response = await checkUserSusbcription();
    setSubscribed(response?.ok || false);
  };
  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal, subscribed }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error("userUsage must be used in UserProvider");
  }
  return context;
};
