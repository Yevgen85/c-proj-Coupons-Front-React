import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import { authStore } from '../../../Redux/AuthorisationState';
import { useEffect, useState } from 'react';
import loginService from '../../../Services/LoginService';
import UserModel from '../../../Models/UserModel';



function Navbar(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user!);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user!);
        });
        return () => unsubscribe();
    },[]);


function login(): void {
        navigate('/login');
}

function logOut(): void {
    loginService.logOut();
    navigate('/');
}
    
function showUserIdentity(): UserModel | null {
    return authStore.getState().user;
}
    

    return (
        <div className='Navbar'>
            
             <div className='n_left'>   
                <img className='rotate' src="https://ionicframework.com/docs/icons/logo-react-icon.png" alt="" />   
             </div>   
            
             <div className='n_center'>
                <h1>Coupon System</h1>
            </div>   
            
            <div className='n_right'> 
            Hello: {user === null ? 'Guest' : <> {showUserIdentity()?.username} </> }
            
            {user === null ? <button onClick={login}>Login</button> : <button onClick={logOut}>LogOut</button>}
             </div>
        </div>
    );
}

export default Navbar;