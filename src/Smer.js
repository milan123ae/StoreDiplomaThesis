import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export class Smer extends Component {

    constructor(props){
        super(props);
        //var _isMounted = false;
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token == null){
          loggedIn = false;
        }
        this.state = {
          loggedIn,
          smers: [],
          newSmerData: {
            nazivSmera: '',
            brojStudenta: ''
          },
          editSmerData: {
            idSmera: '',
            nazivSmera: '',
            brojStudenta: ''
          },
          newSmerModal: false,
          editSmerModal: false
        }
      }

        componentDidMount() {
          this._refreshSmers();
          //this._isMounted = true;
        }
      
        componentDidUpdate(){
          this._refreshSmers();
          //this._isMounted = false;
        }
        componentWillUnmount() {
          // fix Warning: Can't perform a React state update on an unmounted component
          this.setState = (state,callback)=>{
              return;
          };
      }
        toggleNewSmerModal() {
          this.setState({
            newSmerModal: ! this.state.newSmerModal
          });
        }
        toggleEditSmerModal() {
          this.setState({
            editSmerModal: ! this.state.editSmerModal
          });
        }
        addSmer() {
          axios.post('https://localhost:44310/Smer/DodajSmer', this.state.newSmerData).then((response) => {
            let { smers } = this.state;
      
            smers.push(response.data);
      
            this.setState({ smers, newSmerModal: false, newSmerData: {
              nazivSmera: '',
              brojStudenta: ''
            }});
          }).catch(function (error) {
            alert("Podaci nisu dobro unešeni!");
            window.location.reload();
        });
        }
        updateSmer() {
          let { idSmera, nazivSmera, brojStudenta } = this.state.editSmerData;
      
          axios.put('https://localhost:44310/Smer/PromeniSmer' , {
            idSmera,nazivSmera, brojStudenta
          }).then((response) => {
            this._refreshSmers();
      
            this.setState({
              editSmerModal: false, editSmerData: { idSmera: '', nazivSmera: '', brojStudenta: '' }
            })
          }).catch(function (error) {
            alert("Podaci nisu dobro unešeni!");
            window.location.reload();
        });
        }
        editSmer(idSmera, nazivSmera, brojStudenta) {
          this.setState({
            editSmerData: { idSmera, nazivSmera, brojStudenta }, editSmerModal: ! this.state.editSmerModal
          });
        }
        deleteSmer(idSmera) {
          axios.delete('https://localhost:44310/Smer/IzbrisiSmer/' + idSmera).then((response) => {
            this._refreshSmers();
          });
        }
        _refreshSmers() {
          axios.get('https://localhost:44310/Smer/PreuzmiSmerove').then((response) => {
           // if(this._isMounted){
            this.setState({
              smers: response.data
            })
         // }
          });
        }

        render() {
            
           let smers = this.state.smers.map((smer,index) => {
            if(this.state.loggedIn === true){
            return (
              <tr key={index}>
                <td>{smer.idSmera}</td>
                <td>{smer.nazivSmera}</td>
                <td>{smer.brojStudenta}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editSmer.bind(this, smer.idSmera, smer.nazivSmera, smer.brojStudenta)}>Izmeni</Button>
                  <Button color="danger" size="sm" onClick={this.deleteSmer.bind(this, smer.idSmera)}>Izbriši</Button>
                </td>
              </tr>
            )
            }
            else{
              return (
                <tr key={index}>
                  <td>{smer.idSmera}</td>
                  <td>{smer.nazivSmera}</td>
                  <td>{smer.brojStudenta}</td>
                </tr>
              )

            }
            });

        if(this.state.loggedIn === true){
                return (
                  <div className="App container">
                  <Button className="my-3" color="primary" onClick={this.toggleNewSmerModal.bind(this)}>Dodaj smer</Button>
                  <Modal isOpen={this.state.newSmerModal} toggle={this.toggleNewSmerModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewSmerModal.bind(this)}>Dodaj novi smer</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Label for="nazivSmera">Naziv smera</Label>
                        <Input id="nazivSmera" value={this.state.newSmerData.nazivSmera} onChange={(e) => {
                          let { newSmerData } = this.state;
            
                          newSmerData.nazivSmera = e.target.value;
            
                          this.setState({ newSmerData });
                        }} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="brojStudenta">Broj studenta</Label>
                        <Input id="brojStudenta" value={this.state.newSmerData.brojStudenta} onChange={(e) => {
                          let { newSmerData } = this.state;
            
                          newSmerData.brojStudenta = e.target.value;
            
                          this.setState({ newSmerData });
                        }} />
                      </FormGroup>
            
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.addSmer.bind(this)}>Dodaj Smer</Button>{' '}
                      <Button color="secondary" onClick={this.toggleNewSmerModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
            
                  <Modal isOpen={this.state.editSmerModal} toggle={this.toggleEditSmerModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditSmerModal.bind(this)}>Izmeni smer</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Label for="nazivSmera">Naziv smera</Label>
                        <Input id="nazivSmera" value={this.state.editSmerData.nazivSmera} onChange={(e) => {
                          let { editSmerData } = this.state;
            
                          editSmerData.nazivSmera = e.target.value;
            
                          this.setState({ editSmerData });
                        }} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="brojStudenta">Broj studenta</Label>
                        <Input id="brojStudenta" value={this.state.editSmerData.brojStudenta} onChange={(e) => {
                          let { editSmerData } = this.state;
            
                          editSmerData.brojStudenta = e.target.value;
            
                          this.setState({ editSmerData });
                        }} />
                      </FormGroup>
            
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.updateSmer.bind(this)}>Izmeni Smer</Button>{' '}
                      <Button color="secondary" onClick={this.toggleEditSmerModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                    <Table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Naziv smera</th>
                          <th>Broj studenta</th>
                          <th>Akcija</th>
                        </tr>
                      </thead>
            
                      <tbody>
                          {smers}
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
                  <th>Naziv smera</th>
                  <th>Broj studenta</th>
                </tr>
              </thead>
    
              <tbody>
                  {smers}
              </tbody>
            </Table>
      
          </div>
        );

      }
  }
    
    
}

