import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-UK');
    const newTime = new Date(date).toLocaleTimeString('en-UK');
    return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => (
    <div>
        <h3>User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
        <ul>
            <h3>
                {session.getCurrentUser.username}'s Favourites
            </h3>
            {session.getCurrentUser.favourites.map(favourite => (
                <li key={favourite._id}>
                    <Link to={`/recipes/${favourite._id}`}>
                        <p>{favourite.name}</p>
                    </Link>
                </li>
            ))}
            {!session.getCurrentUser.favourites.length && (
                <p><strong>You don't have any favourites yet. Go add some!</strong></p>
            )}
        </ul>
    </div>
);

export default UserInfo;