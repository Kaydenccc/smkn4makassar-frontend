import { BreadcrumbsWithIcon } from "@/components/Menu";
import { NavbarSimple } from "@/components/NavbarGuru";
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="h-full w-full flex flex-col">
      <nav className="py-6 md:py-8 px-6">
        {/* <BreadcrumbsWithIcon /> */}
        <NavbarSimple />
      </nav>
      <div className="px-0 md:px-6 flex-1 flex">{children}</div>;
    </main>
  );
};

export default Layout;
