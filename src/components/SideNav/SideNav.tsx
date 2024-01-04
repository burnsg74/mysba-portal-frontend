import React from "react";
import { SideNav } from "@trussworks/react-uswds";
import "./SideNav.css"

const CustomSideNav = () => {
  
  const navItems = [
    <a
      href="#"
      key="business-info"
      className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black bg-blue-200"
    >
      <span>Business Info</span>
    </a>,
    <a
      href="#"
      key="certifications"
      className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black bg-blue-200"
    >
      <span>Certifications</span>
    </a>,
    <a
      href="#"
      key="loans"
      className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:bg-blue-200"
    >
      <span>Loans</span>
    </a>,
    <a
      href="#"
      key="people"
      className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:bg-blue-200"
    >
      <span>People</span>
    </a>,
  ];

  return (
    <aside className="w-64 bg-white p-6 border-r border-light-grey-border">
      <SideNav items={navItems} />
    </aside>
  );
};

export default CustomSideNav;
