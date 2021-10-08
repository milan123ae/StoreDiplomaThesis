import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export class Predmet extends Component {

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
        nazivPredmeta: ''

      },
      editDipData: {
        idPredmeta: '',
        nazivPredmeta: ''
      },
      newDipModal: false,
      editDipModal: false
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
    toggleEditDipModal() {
      this.setState({
        editDipModal: ! this.state.editDipModal
      });
    }
    addDip() {
      axios.post('https://localhost:44310/Predmet/DodajPredmet', this.state.newDipData)
      .then((response) => {
        //console.log(this.state.newDipData);
        let { dips } = this.state;
        dips.push(response.data);
  
        this.setState({ dips, newDipModal: false, newDipData: {
          nazivPredmeta: ''
        }});
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }
    updateDip() {
      let { idPredmeta, nazivPredmeta } = this.state.editDipData;
  
      axios.put('https://localhost:44310/Predmet/PromeniPredmet' , {
        idPredmeta, nazivPredmeta 
      }).then((response) => {
        this._refreshDips();
  
        this.setState({
          editDipModal: false, editDipData: { idPredmeta: '', nazivPredmeta: '' }
        })
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }
    editDip(idPredmeta, nazivPredmeta) {
      this.setState({
        editDipData: { idPredmeta, nazivPredmeta}, editDipModal: ! this.state.editDipModal
      });
    }
    deleteDip(idPredmeta) {
      axios.delete('https://localhost:44310/Predmet/IzbrisiPredmet/' + idPredmeta).then((response) => {
        this._refreshDips();
      });
    }
    _refreshDips() {
      axios.get('https://localhost:44310/Predmet/PreuzmiSvePredmete').then((response) => {
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
            <td>{dip.idPredmeta}</td>
            <td>{dip.nazivPredmeta}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editDip.bind(this, dip.idPredmeta, dip.nazivPredmeta)}>Izmeni</Button>
              <Button color="danger" size="sm" onClick={this.deleteDip.bind(this, dip.idPredmeta)}>Izbriši</Button>
            </td>
          </tr>
        )
        }
        else{
          return (
            <tr key={index}>
              <td>{dip.idPredmeta}</td>
              <td>{dip.nazivPredmeta}</td>
            </tr>
          )
        }
        });

        if(this.state.loggedIn === true){
            return (
              <div className="App container">

              <Button className="my-3" color="primary" onClick={this.toggleNewDipModal.bind(this)}>Dodaj predmet</Button>
        
              <Modal isOpen={this.state.newDipModal} toggle={this.toggleNewDipModal.bind(this)}>
                <ModalHeader toggle={this.toggleNewDipModal.bind(this)}>Dodaj novi predmet</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="nazivPredmeta">Naziv predmeta:</Label>
                    <Input id="nazivPredmeta" value={this.state.newDipData.nazivPredmeta} onChange={(e) => {
                      let { newDipData } = this.state;
        
                      newDipData.nazivPredmeta = e.target.value;
        
                      this.setState({ newDipData });
                    }} />
                  </FormGroup>
        
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addDip.bind(this)}>Dodaj predmet</Button>{' '}
                  <Button color="secondary" onClick={this.toggleNewDipModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
        
              <Modal isOpen={this.state.editDipModal} toggle={this.toggleEditDipModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditDipModal.bind(this)}>Izmeni predmet</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="nazivPredmeta">Naziv predmeta:</Label>
                    <Input id="nazivPredmeta" value={this.state.editDipData.nazivPredmeta} onChange={(e) => {
                      let { editDipData } = this.state;
        
                      editDipData.nazivPredmeta = e.target.value;
        
                      this.setState({ editDipData });
                    }} />
                  </FormGroup>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.updateDip.bind(this)}>Izmeni Predmet</Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditDipModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Naziv predmeta</th>
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