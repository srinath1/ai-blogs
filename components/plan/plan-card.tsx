"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/actions/stripe";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

const PlanCard = ({ name, image }: { name: string; image: string }) => {
  const { isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCheckout = async () => {
    if (name === "Free") {
      router.push("/dashboard");
      return;
    } else {
      try {
        setLoading(true);
        const { url, error } = await createCheckoutSession();
        if (error) {
          toast.error(error);
          return;
        }
        if (url) {
          window.location.href = url;
        }
      } catch (error: any) {
        toast.error("Something went wrong,please try later");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border">
      <Image
        width={100}
        height={100}
        className="m-5"
        src={image}
        alt="monthly membership"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 ">{name} Membership</div>
        <p className=" text-gray-700 dark:text-gray-300">
          Enjoy{" "}
          {name === "Free"
            ? " Limited Access for AI generated content for 0 DKK"
            : " Unlimited AI generated content for 9.99 DKK"}
        </p>
        <ul className="m-5">
          <li>
            {" "}
            🚀 {name === "Free" ? "Limited" : "Unlimited "} Words Generation
          </li>
          <li>
            🧑‍🦼
            {name === "Free"
              ? "Customer Support"
              : "Priority Customer Support "}
          </li>
          <li>🗽No Ads</li>
        </ul>
      </div>
      {loading ? (
        <div className="px-5 pb-10">
          <Button disabled={loading}>
            <Loader2Icon className="animate-spin mr-2" />
            Processing
          </Button>
        </div>
      ) : !isLoaded ? (
        " "
      ) : !isSignedIn ? (
        <div className="px-5 pb-10">
          <Button>
            <SignInButton />
          </Button>
        </div>
      ) : (
        <div className="px-5 pb-10">
          <Button onClick={handleCheckout}>Get Started</Button>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
