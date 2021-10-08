import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class Logout extends Component {
    constructor(props){
        super(props);
        localStorage.removeItem("token");
        localStorage.removeItem("tok");
    }
  render(){
    return(
      <div className="mt-5 d-flex justify-content-left">
        <h1>You have been logged out</h1>
        <Redirect to="/"/>
      </div>
    )
    
  }

}