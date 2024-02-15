import * as React from 'react';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Layout from "src/components/Layout/Layout";


const DevRoute = () => {
    const navigate = useNavigate();

    return <>
        <Layout>
            <Outlet/>
        </Layout>
    </>;
};

export default DevRoute;
