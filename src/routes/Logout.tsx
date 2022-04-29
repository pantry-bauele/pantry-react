import '../styles/Login.css'

import { logoutUser } from '../api/AuthenticationService'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function Logout() {
    let navigate = useNavigate();

    function redirect() {
        localStorage.removeItem("user");
        navigate("/");
    }

    { logoutUser() }

    useEffect(() => {
        redirect();
    })

    return (
        <div>
            Logged out. Redirecting...
        </div>
    )
}