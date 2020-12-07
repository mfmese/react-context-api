import React, {useState} from 'react'
import UserConsumer from './context';
import axios from 'axios'
import {Link} from 'react-router-dom'

function User(props) {

    const{id, name, department, salary} = props.user;
    

    const [isVisible
        , setIsVisible
    ] = useState(false); 

    const isVisibleClick = (e) => {
        setIsVisible(!isVisible);
    };

    const deleteUser = async (dispatch, e) => {          
        dispatch({type: "DELETE_USER", payload: id});      

        await axios.delete(`http://localhost:3333/users/${id}`);
    }
    
    return(
    <UserConsumer>
        {
            value => {
                const{dispatch} = value;   
                return (
                    <div className="col-md-8 mb-4">
                    <div className="card" style={isVisible ? {backgroundColor:"#CCD1D1", color: "white"}: null}>            
                        <div className="card-header d-flex justify-content-between">
                            <h4 className="d-inline">{name}</h4>
                            <div>
                                <Link to = {`/edit/${id}`} ><i className="pr-2 far fa-edit" style={{cursor: "pointer"}}></i></Link>
                                <i className="pr-2 far fa-trash-alt" style={{cursor: "pointer"}} onClick={deleteUser.bind(this, dispatch)}></i>
                                <i className= {isVisible ? "fas fa-eye-slash" : "fad fa-eye"} style={{cursor: "pointer"}} onClick = {isVisibleClick.bind(this)}></i>
                            </div>                    
                        </div>   
                        {isVisible ?  
                        <div className="card-body">
                            <p className="card-text">Maaş: {salary}</p> 
                            <p className="card-text">Department: {department}</p>              
                        </div>
                        : null}
                    </div> 
                </div>    
                
                )
            }
        }
    </UserConsumer>  
    ); 
}

export default User
