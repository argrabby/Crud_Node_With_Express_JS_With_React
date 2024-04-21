import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';

const Users = () => {
    const loadUsers = useLoaderData();
    const [users, setUsers] = useState(loadUsers);

    const handleDelete = _id => {
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(data.deletedCount === 1) {
                // Remove the deleted user from the state
                setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            // Handle any errors, such as displaying an error message to the user
        });
    }

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} 
                        - <button onClick={() => handleDelete(user._id)}>Delete</button> 
                        - <button><Link to={`/update/${user._id}`}>Update</Link></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
