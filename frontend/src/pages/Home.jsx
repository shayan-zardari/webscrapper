import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {

  const {logOut} = useAuth();

  return (
    <div>
      Home
      <button onClick={logOut}>LogOut</button>
    </div>
  )
}
