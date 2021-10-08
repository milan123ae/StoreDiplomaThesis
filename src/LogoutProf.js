import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class LogoutProf extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {

      }
    
      componentDidUpdate(){

      }
  
      componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

 render(){
    return(
        <div className="App container">
          <br/>
            <Link className="d-inline p-3 bg-dark text-white" to="/Logout">Odjavi se</Link>
          <br/>
      </div>
    )
    
  }

}