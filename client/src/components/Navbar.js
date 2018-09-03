import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ session }) => (
    <nav>
        { session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth /> }
    </nav>
);

const NavbarAuth = ({ session }) => (
    <Fragment>
    <ul>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/recipe/add">Add Recipe</NavLink>
        </li>
        <li>
            <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
            <button>Sign Out</button>
        </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
    </Fragment>
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