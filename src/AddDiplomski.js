import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
import {Link} from 'react-router-dom';

export class AddDiplomski extends Component {
  constructor(props){
    super(props);
    //var _isMounted = false;
    this.state = {
      dips: [],
      newDipData: {
        ocena: '',
        nazivTeme: '',
        datumOdbrane: '',
        emailStudd: '',
        emailNass: '',
        idPredmetaa: ''
      }
    }
  }
    addDip() {
      axios.post('https://localhost:44310/DiplomskiRad/DodajDiplomskiRad', this.state.newDipData)
      .then((response) => {
        //console.log(this.state.newDipData);
        let { dips } = this.state;
        dips.push(response.data);
  
        this.setState({ dips, newDipData: {
          ocena: '',
          nazivTeme: '',
          datumOdbrane: '',
          emailStudd: '',
          emailNass: '',
          idPredmetaa: ''
        }});
       //alert("Podaci su uspešno sačuvani!"); 
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }

    
    render() {

            return (
                <div className="mt-5 d-flex justify-content-center">
                <Form onSubmit={this.submitForm}>
                  <FormGroup>
                    <Label for="ocena">Ocena:</Label> <br/> 
                    <select id="ocena" value={this.state.newDipData.ocena} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.ocena = e.target.value;
        
                      this.setState({ newDipData });
                    }} >
                  <option value="5">5</option>
                  <option value="6">6</option>s
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  </select> 
                  </FormGroup>
                  <FormGroup>
                    <Label for="nazivTeme">Naziv teme:</Label>
                    <Input id="nazivTeme" value={this.state.newDipData.nazivTeme} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.nazivTeme = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="datumOdbrane">Datum odbrane:</Label>
                    <Input type="date" id="datumOdbrane" value={this.state.newDipData.datumOdbrane} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.datumOdbrane = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="emailStudd">Email studenta:</Label>
                    <Input id="emailStudd" value={this.state.newDipData.emailStudd} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.emailStudd = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="emailNass">Email profesora:</Label>
                    <Input id="emailNass" value={this.state.newDipData.emailNass} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.emailNass = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="idPredmetaa">Id Predmeta:</Label>
                    <Input id="idPredmetaa" value={this.state.newDipData.idPredmetaa} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.idPredmetaa = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
        

                  <Button color="primary" onClick={this.addDip.bind(this)} className="mr-2" type="submit">Dodaj diplomski</Button>{' '}
                  <Link className="d-inline p-2 bg-dark text-white" to="/DiplomskiRad">Nazad</Link>
              </Form>

            </div>
            );

          
    }

}