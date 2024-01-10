import * as React from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {Outlet} from 'react-router-dom';
import {useEffect} from "react";

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {authState } = useOktaAuth();

    useEffect(() => {
        console.log("authState Changed: ", authState)
        if (!authState || !authState.isAuthenticated) {
            console.log("Not Auth ")
            // return <Navigate to="/" replace/>;
        }
    }, [authState]);

    return children ? children : <Outlet/>;
};

export default ProtectedRoute;
