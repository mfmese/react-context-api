import React from "react";
import UserConsumer from "./context";
import User from "./User";
import {Link} from 'react-router-dom'

function Users() {
  return (
    <UserConsumer>
      {(value) => {
        const { users } = value;

        return (
          <div>
            <div className="col-md-8 mb-4">
                <Link to="/add" className="d-flex justify-content-end"> <i className="pr-2 far fa-plus mr-3" style={{cursor: "pointer"}}></i></Link>
            </div>
            {users.map((user) => {
              return (
                <User user={user} key={user.id} dispatch={value.dispatch} />
              );
            })}
          </div>
        );
      }}
    </UserConsumer>
  );
}

export default Users;
