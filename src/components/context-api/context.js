import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserContext = React.createContext();
//React.createContext nesnesi 2 nesneye sahiptir. Bunlar Provider, Consumer

const reducer = (state, action) => {

  switch (action.type) {
    case "DELETE_USER":
      return {
        ...state, //spread operator
        users: state.users.filter(user => user.id !== action.payload)
      }
    case "ADD_USER":     
      return{
        ...state,
        users: [...state.users, action.payload] // state.users.push(action.payload)  -> bu şekilde array nesnesine ekleme yapsakda push methodu array uzunluğunu döndüğü için proplem yaşıyoruz
      }
    case "UPDATE_USER":     
    return{
      ...state,
      users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
    }
    default:
      return state;
  }
}
export function UserProvider(props) {

    var stateTemp = {
     users : [],
      dispatch: action => {
        setState (state => reducer (state, action));
      }
    };

    const [state, setState] = useState(stateTemp)
    
    const runOneTime = true;

    useEffect(  () => {
       axios.get("http://localhost:3333/users")
      .then( response => {
        setState( {...state, users : response.data})
      })    
    },[runOneTime])
      
    return (
        <UserContext.Provider value= {state}>
            {props.children}
        </UserContext.Provider>
    )
}
  
const UserConsumer =  UserContext.Consumer;

export default UserConsumer;

