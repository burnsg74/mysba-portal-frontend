import React, { useState } from "react";
import "./Header.css"
import { Header, NavDropDownButton, NavList } from "@trussworks/react-uswds";
import SBALogo from "../../assets/SBA-Logo-Horizontal.png";
import ListIcon from "../../assets/menu.svg";

const SBAHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState("en");

  const toggleNav = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };
  return (
    <div>
      <Header basic={true} className="h-18">
        <div className="flex justify-between border-b border-light-grey-border items-center w-full">
          <div className="flex items-center pl-10">
            <a href="/" title="Home" aria-label="Home">
              <img src={SBALogo} alt="Sweet Delights" className="h-8 mr-28" />
            </a>
            <NavList type="primary" items={[]}>
              <NavDropDownButton
                menuId="dropdown-menu"
                label="Dropdown Title"
                onToggle={toggleNav}
                isOpen={expanded}
              >
                <a href="/services" className="usa-nav__link">
                  Services
                </a>
                <a href="/resources" className="usa-nav__link">
                  Resources
                </a>
                <a href="/about" className="usa-nav__link">
                  About Us
                </a>
                <a href="/contact" className="usa-nav__link">
                  Contact
                </a>
              </NavDropDownButton>
            </NavList>
          </div>
          <div className="flex items-center pr-10">
            <select
              value={language}
              onChange={(event) => {
                handleLanguageChange(event);
              }}
              className="text-black text-lg font-public-sans font-normal break-words bg-white py-1 rounded mr-1 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
            <button
              type="button"
              onClick={toggleNav}
              className="inline-flex items-center justify-center p-2 pl-5 border hover:bg-blue-700 rounded-full custom-button-border"
              aria-label="Toggle Navigation"
            >
              <img src={ListIcon} alt="Menu" className="h-6 w-6" />
              <div className="inline-flex items-center justify-center bg-blue-600 rounded-full h-8 w-8 ml-2">
                <span className="text-white text-lg font-semibold">C</span>
              </div>
            </button>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default SBAHeader;
