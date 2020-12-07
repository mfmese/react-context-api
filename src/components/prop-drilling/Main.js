import React, {useState} from 'react'
import Users from './Users';

function Main() {
    var userArray = [
        {
          id: 1,
          name: "Mehmet",
          salary: 15000,
          department: "Bilişim"
        },
        {
          id: 2,
          name: "Hasan",
          salary: 500000,
          department: "Temizlik"
        }
    
      ];
    
      const [users
        , setUsers
      ] = useState(userArray)
      
    
      const deleteUser = (id) => {
        setUsers(
          users.filter(user=> id !== user.id)
        );
      }
    
      return (
        <div className="container">          
          <Users users = {users} deleteUser = {deleteUser}/>
        </div>
      );
}

export default Main
