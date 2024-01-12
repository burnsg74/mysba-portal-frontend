import {UserClaims} from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import {setUser} from '../../store/user/userSlice';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';

let isWaitingForOktaSign = false;
const LandingPage = () => {
    const USER_DATA_API = 'https://hgoxmkqll5.execute-api.us-east-1.amazonaws.com/dev/get-user-data';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authState, oktaAuth} = useOktaAuth();

    const fetchUserDataFromBackend = async (info: UserClaims) => {
        const response = await fetch(USER_DATA_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email: info.email, first_name: info.given_name, last_name: info.family_name})
        });
        return await response.json();
    }

    const signIn = async () => {
        dispatch(setUser(null));
        isWaitingForOktaSign = true;
        await oktaAuth.signInWithRedirect();
    };

    useEffect(() => {
        if (!authState && isWaitingForOktaSign) return;
        if (!authState || !authState.isAuthenticated) {

            signIn();
        } else {
            oktaAuth.getUser()
                .then((info: UserClaims) => {
                    return fetchUserDataFromBackend(info);
                }).then((data) => {
                    dispatch(setUser(data));
                    navigate('/dashboard');
                }
            );
        }
    }, [oktaAuth, authState]);


    return null;
    // @TODO - When we start using invite code. if not valid, show error on landing page instead of redirecting to okta login
    // return (
    //     <div>
    //         <header className="flex justify-between items-center m-3 border-b pb-3">
    //             <img src={SBALogo} alt="SBA Logo" className="h-8"/>
    //             <button
    //                 onClick={login}
    //                 className="text-blue-700 bg-blue-100 hover:bg-blue-200 font-semibold py-2 px-4 border border-blue-500 rounded-full mr-5 float-right">
    //                 Sign In
    //             </button>
    //         </header>
    //     </div>
    // );
};

export default LandingPage;