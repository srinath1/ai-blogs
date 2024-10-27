import React from "react";
import PlanCard from "@/components/plan/plan-card";

const Membership = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mt-10 text-center">
        {" "}
        Upgrade With Monthly Membesrhip
      </h1>
      <div className="flex flex-wrap justify-center">
        <PlanCard name="Monthly" image="/monthly.png" />
        <PlanCard name="Free" image="/Free.png" />
      </div>
    </div>
  );
};

export default Membership;
