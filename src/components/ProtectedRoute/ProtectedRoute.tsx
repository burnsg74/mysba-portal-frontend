import * as React from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {Outlet} from 'react-router-dom';
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {authState} = useOktaAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) return navigate("/");
    }, [authState]);

    return children ? children : <Outlet/>;
};

export default ProtectedRoute;
