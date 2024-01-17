import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {OktaAuth} from '@okta/okta-auth-js';
import {Security} from '@okta/okta-react';
import {LoginCallback} from '@okta/okta-react';
import Businesses from "src/pages/Businesses/Businesses";
import Certifications from "src/pages/Certifications/Certifications";
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Help from "src/pages/Help/Help";
import Landing from 'src/pages/Landing/Landing'
import Loading from "src/pages/Loading/Loading";
import Loans from "src/pages/Loans/Loans";
import Profile from "src/pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// @TODO Move this to a config file
const oktaAuth = new OktaAuth({
    clientId: '0oacsfgduKvV9LKa80j6',
    issuer: 'https://sbadev.okta-gov.com/oauth2/default',
    redirectUri: `${window.location.origin}/login/callback`,
    postLogoutRedirectUri: `${window.location.origin}`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true
});

const App: React.FC = () => {
    const navigate = useNavigate();
    const restoreOriginalUri = () => {
        navigate('/')
    };

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/login/callback" element={<LoginCallback loadingElement={<Loading/>}/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/businesses" element={<Businesses/>}/>
                    <Route path="/certifications" element={<Certifications/>}/>
                    <Route path="/loans" element={<Loans/>}/>
                    <Route path="/help" element={<Help/>}/>
                </Route>
            </Routes>
        </Security>
    );
}

export default App;
