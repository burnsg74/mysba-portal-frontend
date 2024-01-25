import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserClaims} from "@okta/okta-auth-js/types/lib/oidc/types/UserClaims";
import {setUser} from 'src/store/user/userSlice';
import {useOktaAuth} from '@okta/okta-react';
import {setNav} from "src/store/showNav/showNavSlice";

let isWaitingForOktaSign = false;
const Landing = () => {
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

    useEffect(() => {
        const signIn = async () => {
            dispatch(setUser(null));
            isWaitingForOktaSign = true;
            await oktaAuth.signInWithRedirect();
        };

        if (!authState && isWaitingForOktaSign) return;
        if (!authState || !authState.isAuthenticated) {
            signIn();
        } else {
            oktaAuth.getUser()
                .then((info: UserClaims) => {
                    return fetchUserDataFromBackend(info);
                }).then((user) => {
                    dispatch(setUser(user));

                    if (!user || !user.profile || !user.profile.id) {
                        console.log('User profile not found in database');
                        dispatch(setNav(false));
                        navigate('/account-setup/1');
                    } else {
                        navigate('/dashboard');
                    }
                }
            );
        }
    }, [oktaAuth, authState, dispatch, navigate]);

    useEffect(() => {
        navigate('/dashboard');
    }, [navigate]);


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

export default Landing;