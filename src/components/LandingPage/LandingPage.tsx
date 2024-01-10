import React from "react";
import SBALogo from "../../assets/SBA-Logo-Horizontal.png";
import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            // setUserInfo(null);
            console.log("Not authenticated")
        } else {
            console.log("Authenticated")
            oktaAuth.getUser().then((info) => {
                // setUserInfo(info);
                // navigate('/dashboard');
                console.log("User info: ", info)
            });
        }
    }, [oktaAuth, authState]);

    const login = async () => {
        console.log("Login")
        await oktaAuth.signInWithRedirect();
        console.log("Login After")
    };

    return (
        <div>
            <header className="flex justify-between items-center m-3 border-b pb-3">
                <img src={SBALogo} alt="Sweet Delights" className="h-8"/>
                <button
                    onClick={login}
                    className="text-blue-700 bg-blue-100 hover:bg-blue-200 font-semibold py-2 px-4 border border-blue-500 rounded-full mr-5 float-right">
                    Sign In
                </button>
            </header>
        </div>
    );
};

export default LandingPage;