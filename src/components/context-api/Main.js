import React from "react";
import LifeCycle from "../life-cycle-methods/LifeCycle";
import AddUser from "./AddUser";
import { UserProvider } from "./context";
import Users from "./Users";
import About from "../About";
import NotFound from "../NotFound";
import UpdateUser from "./UpdateUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from '../Navbar';

function Main() {
  return (
    <UserProvider>
      <Router>
        <Navbar title="User App" />   
        {/* <AddUser /> */}
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/about" component={About} />
          <Route exact path="/add" component={AddUser} />
          <Route exact path="/edit/:id" component={UpdateUser} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default Main;
