import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
        <a href="/" className="btn">Home</a>
        <a href="/register" className="btn">Register</a>
        <a href="/login" className="btn">Login</a>
        <a href="/employee-management" className="btn">Employee Management</a>
    </div>
  );
}

export default Navbar