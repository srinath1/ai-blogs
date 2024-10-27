import MobileNav from "@/components/nav/mobilenav";
import SideNav from "@/components/nav/side-nav";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <div className=" hidden md:block w-1/4 h-full">
        <SideNav />
      </div>
      <div className="flex flex-col  md:flex-row  w-full ">
        <div className="md:hidden w-full">
          <MobileNav />
        </div>
        <div className="flex-1">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
