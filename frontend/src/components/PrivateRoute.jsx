import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute() {
    const {user, token, loading} = useAuth();

    if (loading) return <div>Loading...</div>
    
    if (!user || !token ) {
        console.log(user, token, loading);
        return <Navigate to="/signin"/>;
    };

    if (!user.profile_verified) return <Navigate to="/verify-email"/>;

    return <Outlet/>;

};
