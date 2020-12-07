import React, {useState, useEffect} from 'react'
import posed from 'react-pose'
import UserConsumer from './context';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Animation = posed.div({
    visible: {opacity: 1, applyAtStart:{display:"block"}},
    hidden : {opacity: 0, applyAtEnd: {display:"none"}}
});

function UpdateUser(props) {

    const history = useHistory();

    const stateInit = {
        isVisible: true,
        name: '',
        salary:'',
        department: ''
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

    const updateUser  = async (dispatch, e) => {

        e.preventDefault();

        const{name, salary, department} = state;

        let updatedUser = {        
            name,
            salary,
            department
        };

        const {id} = props.match.params;

        var response = await axios.put(`http://localhost:3333/users/${id}`, updatedUser);

        // console.log(response);

        console.log("updateUser")
         console.log(dispatch);

         dispatch({type: "UPDATE_USER", payload: response.data});

         //Redirect to main page        
         history.push('/');
    }

    useEffect(() => {
     
        if(props.match === undefined)
            return;

        const {id} = props.match.params;
        
         axios.get(`http://localhost:3333/users/${id}`)
         .then(response => {          
             const{name, salary, department} = response.data;
            setState({...state.users, name, salary, department, isVisible:true})
     
         })
    }, [props])

    return(
        
        <UserConsumer>
            {
                value => {

                    // const {dispatch} = value;
                    return (
                        
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h4 className="d-inline">Update User</h4>
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
                
                                        <button className="btn btn-danger btn-block" onClick={updateUser.bind(this, value)}>Update User</button>
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

export default UpdateUser
