import * as React from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {Outlet} from 'react-router-dom';
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Layout from "src/components/Layout/Layout";


const ProtectedRoute = () => {
    const {authState} = useOktaAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) return navigate("/");
    }, [authState]);


    return <>
        <Layout>
            <Outlet/>
        </Layout>
    </>;
};

export default ProtectedRoute;
