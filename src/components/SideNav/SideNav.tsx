import React from "react";
import { SideNav } from "@trussworks/react-uswds";
import "./SideNav.css"
import { Link } from 'react-router-dom';

const CustomSideNav = () => {
  
  const navItems = [
    <Link
        to="/dashboard"
        key="Dashboard"
        className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black"
    >
      <span>Dashboard</span>
    </Link>,
    <Link
        to="/businesses"
        key="Businesses"
        className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black"
    >
      <span>Businesses</span>
    </Link>,
    <Link
        to="/certifications"
        key="Certifications"
        className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black"
    >
      <span>Certifications</span>
    </Link>,
    <Link
        to="/loans"
        key="Loans"
        className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black"
    >
      <span>Loans</span>
    </Link>,
    <Link
        to="/help"
        key="Help"
        className="block w-full px-4 py-2 bg-white rounded-full text-black font-medium text-lg hover:text-black"
    >
      <span>Help</span>
    </Link>
  ];

  return (
    <aside className="w-64 bg-white p-6 border-r border-light-grey-border">
      <SideNav items={navItems} />
    </aside>
  );
};

export default CustomSideNav;
