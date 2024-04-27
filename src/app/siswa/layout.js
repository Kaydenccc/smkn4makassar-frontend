import { NavbarSimple } from "@/components/NavbarSiswa";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="p-8 px-2 md:px-8">
      <NavbarSimple />
      <div>{children}</div>
    </div>
  );
};

export default layout;
