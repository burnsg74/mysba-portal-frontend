import React, {useState} from "react";
import "./Header.css"
import {Header} from "@trussworks/react-uswds";
import SBALogo from "../../assets/SBA-Logo-Horizontal.png";
import ListIcon from "../../assets/menu.svg";
import {useOktaAuth} from '@okta/okta-react';
import {Link} from "react-router-dom";

const SBAHeader = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [language, setLanguage] = useState("en");
    const {authState, oktaAuth} = useOktaAuth();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(event.target.value);
    };

    const logout = async () => oktaAuth.signOut();

    return (
        <div>
            <Header basic={true} className="h-18">
                <div className="flex justify-between border-b border-light-grey-border items-center w-full">
                    <div className="flex items-center pl-10">
                        <a href="/dashboard" title="Dashboard" aria-label="Dashboard">
                            <img src={SBALogo} alt="SBA Logo" className="h-8 mr-28"/>
                        </a>
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
                        </select>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                                className="flex  items-center justify-center p-2 pl-5 border hover:bg-blue-700 rounded-full custom-button-border relative"
                                aria-label="Toggle Navigation"
                            >
                                <img src={ListIcon} alt="Menu" className="h-6 w-6"/>
                                <div
                                    className="inline-flex items-center justify-center bg-blue-600 rounded-full h-8 w-8 ml-2">
                                    <span className="text-white text-lg font-semibold">C</span>
                                </div>
                            </button>
                            {isDropdownVisible && (
                                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-xl">
                                    <Link
                                        to="/profile"
                                        key="Profile"
                                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                                    >
                                        <span>My Profile</span>
                                    </Link>
                                    <span
                                        onClick={logout}
                                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                                        Log out
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default SBAHeader;
