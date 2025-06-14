import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../components/Navbar';

export default function Home() {

  const { user} = useAuth();

  return (
    <div>
      <NavBar/>
      <div>Hi {user.name}</div>
      <div>your data is: {JSON.stringify(user)}</div>
    </div>
  )
}
