import React, {useState} from 'react'
import PropTypes from 'prop-types'


const User = (props) => {
    //Destructing
    const{id, name, department, salary} = props.user;
    const{deleteUser} = props;

    const [isVisible
        , setIsVisible
    ] = useState(false); 

    const isVisibleClick = (message, e) => {
        console.log(message);
        console.log(e.target);
        setIsVisible(!isVisible);
    };

    return (
        <div className="col-md-8 mb-4">
            <div className="card">            
                <div className="card-header d-flex justify-content-between">
                    <h4 className="d-inline">{name}</h4>
                    <div>
                        <i className="pr-2 far fa-trash-alt" style={{cursor: "pointer"}} onClick={deleteUser.bind(this, id)}></i>
                        <i className= {isVisible ? "fas fa-eye-slash" : "fad fa-eye"} style={{cursor: "pointer"}} onClick = {isVisibleClick.bind(this, "button clicked")}></i>
                    </div>                    
                </div>    
                <div className="card-body">
                    {isVisible ? <p className="card-text">Maaş: {salary}</p> : null}
                    <p className="card-text">Department: {department}</p>              
                </div>
            </div> 
        </div>
    )
}

User.propTypes = {
    deleteUser: PropTypes.func.isRequired
}

export default User
