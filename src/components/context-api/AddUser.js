import React, {useState} from 'react'
import posed from 'react-pose'
import UserConsumer from './context';
import uuid from 'react-uuid'
import axios from 'axios'
import { useHistory } from "react-router";

const Animation = posed.div({
    visible: {opacity: 1, applyAtStart:{display:"block"}},
    hidden : {opacity: 0, applyAtEnd: {display:"none"}}
});

function AddUser() {

    const history = useHistory();

    const stateInit = {
        isVisible: true,
        name: '',
        salary:'',
        department: '',
        isValidated: true
    };

    const [state
        , setState
    ] = useState(stateInit); 

    const isVisibleClick = (e) => {
        setState({...state, isVisible : !state.isVisible});
    };

    const changeInput = (e) => {
        setState({...state,[e.target.name] : e.target.value});
    }

    const addUser  = async (dispatch, e) => {

        e.preventDefault();

        const{name, salary, department} = state;        

        if(!validateForm()){
            setState({...state, isValidated:false})
            return;
        }
        else{
            setState({...state,isValidated:true})
        }

        let newUser = {
            id : uuid(),
            name,
            salary,
            department
        };

        var response = await axios.post("http://localhost:3333/users", newUser);

        dispatch({type: "ADD_USER", payload: response.data});

        //Redirect to main page        
        history.push('/');
    }

    const validateForm = () => {
        const{name, salary, department} = state;

        if(!name || !salary || !department){  
            return false;
        }
        return true;
    }

    return(
        <UserConsumer>
            {
                value => {

                    const {dispatch} = value;
                    return (                    
                        <div className="col-md-8 mb-4">
                            {
                                validateForm() ? null : 
                                <div className="alert alert-danger">Lütfen formu kontrol ediniz!</div>
                            }
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h4 className="d-inline">Add User</h4>
                                    <i className= {state.isVisible ? "fas fa-eye-slash" : "fad fa-eye"} style={{cursor: "pointer"}} onClick = {isVisibleClick.bind(this)}></i>
                                </div>
                                <Animation pose = {state.isVisible ? "visible" : "hidden"}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="name" >Name</label>
                                            <input
                                            id = "name"
                                            type ="text"
                                            name ="name"
                                            placeholder = "Name"
                                            className = "form-control"
                                            value = {state.name}
                                            onChange = {changeInput}
                                        />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="salary" >Salary</label>
                                            <input
                                            id = "salary"
                                            type ="text"
                                            name ="salary"
                                            placeholder = "Salary"
                                            className = "form-control"
                                            value = {state.salary}
                                            onChange = {changeInput}
                                        />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="department" >Department</label>
                                            <input
                                            id = "department"
                                            type ="text"
                                            name ="department"
                                            placeholder = "Department"
                                            className = "form-control"
                                            value = {state.department}
                                            onChange = {changeInput}
                                        />
                                        </div>
                
                                        <button className="btn btn-danger btn-block" onClick={addUser.bind(this, dispatch)}>Add User</button>
                                    </div>                  
                                </Animation>
                            </div>
                            
                        </div>
                    )
                }
            }
        </UserConsumer>
    )
}

export default AddUser
