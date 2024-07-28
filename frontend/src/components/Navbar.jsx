import React from "react";
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log("user",user);
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <button onClick={logout}>Logout</button>
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
