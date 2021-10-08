import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Button } from 'reactstrap';

export class Login extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token");
        let loggedIn = true;
        let status= false;
        if(token == null){
          loggedIn = false;
        }
        const tok = localStorage.getItem("tok");
        let loggedInProf = true;
        if(tok == null){
          loggedInProf = false;
        }
        this.state = {
          loggedInProf,
            dips: [],
            email: '',
            password: '',
            loggedIn,
            status,
            login: "admin"

        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRadioChange(event) {
      this.setState({
        login: event.target.value
      });
    }
    submitForm(e){
        e.preventDefault()
       // const { email, password} = this.state
        // login in
        if(this.state.login ==="admin")
        {
            axios.post('https://localhost:44310/Administracija/DodajLogovanje', this.state)
            .then((response) => {
             // console.log(this.state.newDipData);
              let { dips } = this.state;
              dips.push(response.data);
             // localStorage.setItem("token","setovanToken")
             localStorage.setItem("token", this.state.email);
              this.setState({
                  loggedIn: true
              })
        
            }).catch(function (error) {
                alert("Email ili Password nisu dobro unešeni!");
                window.location.reload();
            });
        }
        else{
            axios.post('https://localhost:44310/NastavnoOsoblje/DodajLogovanje', this.state)
            .then((response) => {
             // console.log(this.state.newDipData);
              let { dips } = this.state;
              dips.push(response.data);
             // localStorage.setItem("token","setovanToken");
             //sessionStorage.setItem('user', JSON.stringify(this.state.email));
             localStorage.setItem("tok",JSON.stringify(this.state.email));
              this.setState({
                  loggedInProf: true
              })
        
            }).catch(function (error) {
                alert("Email ili Password nisu dobro unešeni!");
                window.location.reload();
            });
        }

    }

  render(){
      /* if(this.state.loggedIn === true){
          if(this.state.login === "admin")
          {
            return <Redirect to="/Administracija"/>
          }
          else if(this.state.login === "profesor"){
            return <Redirect to="/Administracija"/>
          }
      } */
    if(this.state.loggedIn === true){
      return <Redirect to="/Administracija"/>
          }
     if(this.state.loggedInProf === true){
            return <Redirect to="/LogoutProf"/>
         }
    return(
      <div className="mt-5 d-flex justify-content-center">

        <Form onSubmit={this.submitForm}>
        <FormGroup>
            <Label for="email">Email:</Label><br/>
            <input type="text" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
            <Label for="password">Password:</Label><br/>
            <input type="text" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChange} />
        </FormGroup>
        
          <input
            type="radio"
            value="admin" 
            checked={this.state.login === "admin"} // when this is true it show the male radio button in checked 
            onChange={this.handleRadioChange} // whenever it changes from checked to uncheck or via-versa it goes to the handleRadioChange function
          />
          <span
           style={{ marginLeft: "5px" }} // inline style in reactjs 
          >Administrator</span>
          <input
            type="radio"
            value="profesor"
            checked={this.state.login === "profesor"}
            onChange={this.handleRadioChange}
          />
          <span style={{ marginLeft: "5px" }}>Profesor</span>
          <br/>

            <Button variant="primary"   type="submit" >
                Prijavite se
            </Button>
        </Form>
      </div>
    )
    
  }

}
