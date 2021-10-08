import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Dropdown} from 'react-bootstrap';

export class Navigation extends Component{

  render(){

    return(
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                Prijavite se
              </NavLink>
              <NavLink className="d-inline p-2 bg-dark text-white" to="/DiplomskiRad">
                Diplomski Rad
              </NavLink>
              <Dropdown>
                <Dropdown.Toggle variant="d-inline p-2 bg-dark text-white" id="dropdown-basic">
                  Profesor
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="d-inline p--8 bg-dark text-white" href="/NastavnoOsoblje">Profesor</Dropdown.Item>
                    <br/><br/>
                  <Dropdown.Item className="d-inline p--8 bg-dark text-white" href="/AngazovanNa">Profesori Na Predmetu</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="d-inline p-2 bg-dark text-white" id="dropdown-basic">
                  Predmet
                </Dropdown.Toggle>
                <Dropdown.Menu  >
                  <Dropdown.Item className="d-inline p--8 bg-dark text-white" href="/Predmet">Predmet</Dropdown.Item>
                    <br/><br/>
                  <Dropdown.Item className="d-inline p--8 bg-dark text-white" href="/UciNa">Predmeti Na Smeru</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <NavLink className="d-inline p-2 bg-dark text-white" to="/Smer">
                Smer
              </NavLink>
              <NavLink className="d-inline p-2 bg-dark text-white" to="/Student">
                Student
              </NavLink>    
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
 
  }

}