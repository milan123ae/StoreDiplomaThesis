import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export class UciNa extends Component {

  constructor(props){
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if(token == null){
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      dips: [],
      newDipData: {
        idPredmeta: '',
        idSmera: ''
      },
      //uciNaId:'',
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
      axios.post('https://localhost:44310/UciNa/PoveziPredmetISmer/'+this.state.newDipData.idPredmeta+'/'+this.state.newDipData.idSmera, this.state.newDipData)
      .then((response) => {
        //console.log(this.state.newDipData);
        let { dips } = this.state;
       // dips.push(response.data);
  
        this.setState({ dips, newDipModal: false, newDipData: {
          idPredmeta: '', idSmera: ''
        }});
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }

    deleteDip(uciNaId) {
      axios.delete('https://localhost:44310/UciNa/IzbrisiUciNa/' + uciNaId).then((response) => {
        this._refreshDips();
      });
    }
    _refreshDips() {
      axios.get('https://localhost:44310/UciNa/PreuzmiSveUciNa').then((response) => {
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
            <td>{dip.uciNaId}</td>
            <td>{dip.uci.nazivPredmeta}</td>
            <td>{dip.uceNa.nazivSmera}</td>
            <td>
              <Button color="danger" size="sm" onClick={this.deleteDip.bind(this, dip.uciNaId)}>Izbriši</Button>
            </td>
          </tr>
        )
        }
        else{
          return (
            <tr key={index}>
              <td>{dip.uciNaId}</td>
              <td>{dip.uci.nazivPredmeta}</td>
              <td>{dip.uceNa.nazivSmera}</td>
            </tr>
          )
        }
        });
     if(this.state.loggedIn === true){
          return (
            <div className="App container">

            <Button className="my-3" color="primary" onClick={this.toggleNewDipModal.bind(this)}>Poveži predmet i smer</Button>
      
            <Modal isOpen={this.state.newDipModal} toggle={this.toggleNewDipModal.bind(this)}>
              <ModalHeader toggle={this.toggleNewDipModal.bind(this)}>Poveži predmet i smert</ModalHeader>
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
                  <Label for="idSmera">ID smera:</Label>
                  <Input id="idSmera" value={this.state.newDipData.idSmera} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.idSmera = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
      
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.addDip.bind(this)}>Poveži predmet i smert</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewDipModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Naziv predmeta</th>
                    <th>Naziv smera</th>
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
                    <th>Naziv predmeta</th>
                    <th>Naziv smera</th>
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