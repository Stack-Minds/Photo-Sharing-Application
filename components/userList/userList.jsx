import React from 'react';
import { Link } from 'react-router-dom';

class UserList extends React.Component {
    render() {
        const users = window.models.userListModel();

        return (
            <div className="user-list">
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <Link to={`/users/${user._id}`}>{user.first_name} {user.last_name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserList;
