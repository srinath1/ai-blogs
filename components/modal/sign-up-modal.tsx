import { useUsage } from "@/context/usage";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpModal = () => {
  const { openModal, setOpenModal } = useUsage();
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>👉 Unlock Unlimited AI Content</DialogTitle>
          <DialogDescription>
            <p>
              {" "}
              🌝Congrats! you have used your quota pf 10000 words limit,unlock
              for more AI powered content
            </p>
            <p>Subscribe for more usage</p>
            <ul className="m-5 font-semibold">
              <li> 🚀Unlimited AI powered content!</li>
              <li>🧑‍🦼Priority Support</li>
              <li>🗽No Ads</li>
            </ul>
            <p>Dont let your creativity down,let the ides flow !!!!</p>
            <div className="m-5 text-center">
              <Link href="/membership">
                <Button>Join Membership</Button>
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
