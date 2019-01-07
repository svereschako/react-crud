import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import {hashHistory } from 'react-router';
import { Link, Route, IndexRoute, Router} from 'react-router-dom';
import { Auth } from '../Auth';
import {Login} from './Login';
import Example from "./example";
import Element from "./Add";
import PostIndex from "./PostIndex";
import PostView from "./PostView";
import Dashboard from "./Dashboard";
var createHistory = require('history').createBrowserHistory;
var history = createHistory();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    "authenticated": Auth.authenticated()
  };
  }
  
  render() {
  //this.setState({"authenticated": this.props.authenticated});
  if (this.props.authenticated == "true"){
    if(this.props.userType == "admin"){
      return (
      <Router history={history} >
        <div className="container-fluid">
          <nav>
            <Link to="/dashboard" activeClassName="active">Dashboard</Link>
            {" | "}
            <Link to="/edit" activeClassName="active">Edit</Link>
            {" | "}
            <Link to="/view" activeClassName="active">View</Link>            
            <a href="/logout" onClick={Auth.logout.bind(this)} className="pull-right">Logout</a>
          </nav>        
          <Route path="/login" component={Login} />        
            <Route path="/dashboard" component={Dashboard} />          
            <Route path="/edit" component={Example} />
            <Route path="/view" component={PostIndex} />
            <Route path="/post/:postId" component={PostView} />
                        
        </div>      
      </Router>
      );
    }else{
      return (
      <Router history={history} >
        <div className="container-fluid">
          <nav>
            <Link to="/dashboard" activeClassName="active">Dashboard</Link>
            {" | "}
            <Link to="/add" activeClassName="active">Add</Link> 
            <a href="/logout" onClick={Auth.logout.bind(this)} className="pull-right">Logout</a>
          </nav>        
          <Route path="/login" component={Login} />        
            <Route path="/dashboard" component={Dashboard} /> 
            <Route path="/add" component={Element} /> 
        </div>      
      </Router>
      );
    }     
  }else {    
    return (
    <Router history={history} >
      <div className="container-fluid">
        <nav>
          <Link to="/dashboard" activeClassName="active">Dashboard</Link>
          <Link to="/login" activeClassName="active" className="pull-right">Login</Link>
        </nav>        
        <Route path="/login" component={Login} />        
          <Route path="/dashboard" component={Dashboard} /> 
      </div>      
    </Router>
    );
  }
  }
    
}


