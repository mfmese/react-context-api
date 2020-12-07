import React from 'react'
import User from './User'
import PropTypes from 'prop-types'


function Users(props) {

    const {users, deleteUser} = props;

    console.log(users);

    return (
        <div>
            {
                users.map(user => {
                    return(<User key = {user.id} user = {user} deleteUser = {deleteUser}/>)                    
                })
            }
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default Users
