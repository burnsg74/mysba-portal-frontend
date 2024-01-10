import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardContainer from './views/DashboardContainer';
import LandingPage from './components/LandingPage/LandingPage'
import {useNavigate} from 'react-router-dom';
import {OktaAuth} from '@okta/okta-auth-js';
import {Security} from '@okta/okta-react';
import {LoginCallback} from '@okta/okta-react';
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProfileContainer from "./views/ProfileContainer";
import BusinessesContainer from "./views/BusinessesContainer";
import CertificationsContainer from "./views/CertificationsContainer";
import LoansContainer from "./views/LoansContainer";
import HelpContainer from "./views/HelpContainer";

const App: React.FC = () => {
    const navigate = useNavigate();
    const oktaAuth = new OktaAuth({
        clientId: '0oacsfgduKvV9LKa80j6',
        issuer: 'https://sbadev.okta-gov.com/oauth2/default',
        redirectUri: `${window.location.origin}/login/callback`,
        postLogoutRedirectUri: `${window.location.origin}`,
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    });
    console.log("oktaAuth: ", oktaAuth)
    const restoreOriginalUri = () => {
        navigate('/dashboard')
    };

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login/callback" element={<LoginCallback loadingElement={<Loading/>}/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<DashboardContainer/>}/>
                    <Route path="/profile" element={<ProfileContainer/>}/>
                    <Route path="/businesses" element={<BusinessesContainer/>}/>
                    <Route path="/certifications" element={<CertificationsContainer/>}/>
                    <Route path="/loans" element={<LoansContainer/>}/>
                    <Route path="/help" element={<HelpContainer/>}/>
                </Route>
            </Routes>
        </Security>
    );
}

export default App;
