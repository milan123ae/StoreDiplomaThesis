import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export class AngazovanNa extends Component {

  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    const tok = localStorage.getItem("tok");
    let loggedIn = true;
    if(token == null && tok == null){
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      dips: [],
      newDipData: {
        idPredmeta: '',
        email: ''
      },
      //id:'',
      newDipModal: false
    }
  }
    componentDidMount() {
      this._refreshDips();
      //console.log(this.state.dips);
    }
  
    componentDidUpdate(){
      this._refreshDips();
     // console.log(this.state.newDipData);
    }

    componentWillUnmount() {
      this.setState = (state,callback)=>{
          return;
      };
  }
    toggleNewDipModal() {
      this.setState({
        newDipModal: ! this.state.newDipModal
      });
    }

    addDip() {
      axios.post('https://localhost:44310/AngazovanNa/PoveziNastavnikaIPredmet/'+this.state.newDipData.email+'/'+this.state.newDipData.idPredmeta, this.state.newDipData)
      .then((response) => {
        //console.log(this.state.newDipData);
        let { dips } = this.state;
       // dips.push(response.data);
  
        this.setState({ dips, newDipModal: false, newDipData: {
          idPredmeta: '', email: ''
        }});
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }

    deleteDip(id) {
      axios.delete('https://localhost:44310/AngazovanNa/IzbrisiAngazovanNa/' + id).then((response) => {
        this._refreshDips();
      });
    }
    _refreshDips() {
      axios.get('https://localhost:44310/AngazovanNa/PreuzmiSveAngazovanNa').then((response) => {
        this.setState({
          dips: response.data
        })
      //  console.log( response.data);
      });
    }

    render() {
       let dips = this.state.dips.map((dip,index) => {
        if(this.state.loggedIn === true){
        return (
          <tr key={index}>
            <td>{dip.id}</td>
            <td>{dip.angazovanje.lime}</td>
            <td>{dip.angazovanje.imeRoditelja}</td>
            <td>{dip.angazovanje.prezime}</td>
            <td>{dip.angazovan.nazivPredmeta}</td>
            <td>
              <Button color="danger" size="sm" onClick={this.deleteDip.bind(this, dip.id)}>Izbriši</Button>
            </td>
          </tr>
        )
        }
        else{
          return (
            <tr key={index}>
              <td>{dip.id}</td>
              <td>{dip.angazovanje.lime}</td>
              <td>{dip.angazovanje.imeRoditelja}</td>
              <td>{dip.angazovanje.prezime}</td>
              <td>{dip.angazovan.nazivPredmeta}</td>
            </tr>
          )

        }

      });
      if(this.state.loggedIn === true){
            return (
              <div className="App container">

              <Button className="my-3" color="primary" onClick={this.toggleNewDipModal.bind(this)}>Poveži profesora i predmet</Button>
        
              <Modal isOpen={this.state.newDipModal} toggle={this.toggleNewDipModal.bind(this)}>
                <ModalHeader toggle={this.toggleNewDipModal.bind(this)}>Poveži profesora i predmet</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="idPredmeta">ID predmeta:</Label>
                    <Input id="idPredmeta" value={this.state.newDipData.idPredmeta} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.idPredmeta = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email Profesora:</Label>
                    <Input id="email" value={this.state.newDipData.email} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.email = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
        
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addDip.bind(this)}>Poveži profesora i predmet</Button>{' '}
                  <Button color="secondary" onClick={this.toggleNewDipModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>

                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ime</th>
                      <th>ImeRod</th>
                      <th>Prezime</th>
                      <th>Naziv Predmeta</th>
                      <th>Akcija</th>
                    </tr>
                  </thead>
        
                  <tbody>
                      {dips}
                  </tbody>
                </Table>
              </div>
            );
      }
      else{
        return (
          <div className="App container">
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ime</th>
                      <th>ImeRod</th>
                      <th>Prezime</th>
                      <th>Naziv Predmeta</th>
                    </tr>
                  </thead>
        
                  <tbody>
                      {dips}
                  </tbody>
                </Table>
              </div>
            );
        }
     
    }

}