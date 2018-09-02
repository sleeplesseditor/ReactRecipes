import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <NavbarUnAuth />
    </nav>
);

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Sign Up</NavLink>
        </li>
    </ul>
);

export default Navbar;