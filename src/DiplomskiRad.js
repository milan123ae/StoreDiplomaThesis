import React, { Component } from 'react';
import axios from 'axios';
//import Select from 'react-select';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import {Link} from 'react-router-dom';

export class DiplomskiRad extends Component {
  constructor(props){
    super(props);
    //var _isMounted = false;
    const token = localStorage.getItem("token");
    const tok = localStorage.getItem("tok");
    let loggedIn = true;
    if(token == null && tok == null){
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      dips: [],
      editDipData: {
        id_Diplomski: '',
        ocena: '',
        nazivTeme: '',
        datumOdbrane: '',
        emailStudd: '',
        emailNass: '',
        idPredmetaa: ''
      },
      editDipModal: false,
      term: ''
    }
    this.searchHandler = this.searchHandler.bind(this);
  }
    componentDidMount() {
      //this._isMounted = true;
      this._refreshDips();
      console.log(this.token);
    }
  
    componentDidUpdate(){
      //this._isMounted = false;
      this._refreshDips();
     // console.log(this.state.newDipData);
    }

    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
  }   
    
    toggleEditDipModal() {
      this.setState({
        editDipModal: ! this.state.editDipModal
      });
    }

    updateDip() {
      let { id_Diplomski, ocena, nazivTeme, datumOdbrane, emailStudd, emailNass, idPredmetaa } = this.state.editDipData;
  
      axios.put('https://localhost:44310/DiplomskiRad/PromeniDiplomskiRad' , {
        id_Diplomski, ocena, nazivTeme, datumOdbrane, emailStudd, emailNass, idPredmetaa
      }).then((response) => {
        this._refreshDips();
  
        this.setState({
          editDipModal: false, editDipData: { id_Diplomski: '', ocena: '', nazivTeme: '', datumOdbrane: '', emailStudd: '', emailNass: '',idPredmetaa: ''  }
        })
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }
    editDip(id_Diplomski, ocena, nazivTeme, datumOdbrane, emailStudd, emailNass, idPredmetaa) {
      this.setState({
        editDipData: { id_Diplomski, ocena, nazivTeme, datumOdbrane, emailStudd, emailNass, idPredmetaa }, editDipModal: ! this.state.editDipModal
      });
    }
    deleteDip(id_Diplomski) {
      axios.delete('https://localhost:44310/DiplomskiRad/IzbrisiDiplomskiRad/' + id_Diplomski).then((response) => {
        this._refreshDips();
      });
    }
    _refreshDips() {
      axios.get('https://localhost:44310/DiplomskiRad/PreuzmiSveDiplomske').then((response) => {
       // if(this._isMounted){
        this.setState({
          dips: response.data
        })
       // console.log( response.data);
     // }
      });
    }

    searchHandler(event){
      this.setState({term: event.target.value})
    }
    searchingFor(term) {
      return function (x) {
        return x.nazivTeme.toLowerCase().includes(term.toLowerCase()) || !term ||
               x.ocena.toLowerCase().includes(term.toLowerCase()) ||
               x.datumOdbrane.toLowerCase().includes(term.toLowerCase()) ||
               x.emailStudd.toLowerCase().includes(term.toLowerCase()) ||
               x.emailNass.toLowerCase().includes(term.toLowerCase()) ||
               x.upisaoPredmet.nazivPredmeta.toLowerCase().includes(term.toLowerCase()) ||
               x.id_Diplomski.toString().toLowerCase().includes(term.toLowerCase());
      }
    }
  /* search(dips){
      return this.state.dips.filter(
        (dip) =>
        this.state.dips.indexOf(this.state.dips) > -1
      )
    }   
    */

    render() {
        let dips = this.state.dips.filter(this.searchingFor(this.state.term)).map((dip,index) => {
        //let dips =  this.state.search(this.state.dips).map((dip,index) => {
        if(this.state.loggedIn === true){
        return (
          <tr key={index}>
            <td>{dip.id_Diplomski}</td>
            <td>{dip.ocena}</td>
            <td>{dip.nazivTeme}</td>
            <td>{dip.datumOdbrane}</td>
            <td>{dip.emailStudd}</td>
            <td>{dip.emailNass}</td>
            <td>{dip.upisaoPredmet.nazivPredmeta}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editDip.bind(this, dip.id_Diplomski, dip.ocena, dip.nazivTeme, dip.datumOdbrane, dip.emailStudd, dip.emailNass, dip.idPredmetaa)}>Izmeni</Button>
              <Button color="danger" size="sm" onClick={this.deleteDip.bind(this, dip.id_Diplomski)}>Izbriši</Button>
            </td>
          </tr>
        )

    }
        else{
          return (
            <tr key={index}>
              <td>{dip.id_Diplomski}</td>
              <td>{dip.ocena}</td>
              <td>{dip.nazivTeme}</td>
              <td>{dip.datumOdbrane}</td>
              <td>{dip.emailStudd}</td>
              <td>{dip.emailNass}</td>
              <td>{dip.upisaoPredmet.nazivPredmeta}</td>
            </tr>
          )
        }
        });
        if(this.state.loggedIn === true){
            return (
              <div className="App container">

            <br/>
              <Link className="d-inline p-3 bg-dark text-white" to="/AddDiplomski">Dodaj diplomski</Link>
            <br/>

              <form>
                <input type="text" className="d-inline p-2 bg-light text-black" placeholder="Filter" onChange={this.searchHandler} value = {this.state.term} />
              </form>
              <br/>
        
              <Modal isOpen={this.state.editDipModal} toggle={this.toggleEditDipModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditDipModal.bind(this)}>Izmeni diplomski</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="ocena">Ocena:</Label> <br/>
                    <select id="ocena" value={this.state.editDipData.ocena} onChange={(e) => {
                      let { editDipData } = this.state;
        
                      editDipData.ocena = e.target.value;
        
                      this.setState({ editDipData });
                    }} >
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  </select> 
                  </FormGroup>
                  <FormGroup>
                    <Label for="nazivTeme">Naziv teme:</Label>
                    <Input id="nazivTeme" value={this.state.editDipData.nazivTeme} onChange={(e) => {
                      let { editDipData } = this.state;
        
                      editDipData.nazivTeme = e.target.value;
        
                      this.setState({ editDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="datumOdbrane">Datum odbrane:</Label>
                    <Input type="date"  id="datumOdbrane"  onChange={(e) => {
                      let { editDipData } = this.state;

                      editDipData.datumOdbrane = e.target.value;
        
                      this.setState({ editDipData });
                    }} />
                  </FormGroup>
              {/*    <FormGroup>
                    <Label for="emailStudd">Email studenta:</Label>
                    <Input id="emailStudd" value={this.state.editDipData.emailStudd} onChange={(e) => {
                      let { editDipData } = this.state;

                      editDipData.emailStudd = e.target.value;
        
                      this.setState({ editDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="emailNass">Email profesora:</Label>
                    <Input id="emailNass" value={this.state.editDipData.emailNass} onChange={(e) => {
                      let { editDipData } = this.state;

                      editDipData.emailNass = e.target.value;
        
                      this.setState({ editDipData });
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="idPredmetaa">Id Predmeta:</Label>
                    <Input id="idPredmetaa" value={this.state.editDipData.idPredmetaa} onChange={(e) => {
                      let { editDipData } = this.state;

                      editDipData.idPredmetaa = e.target.value;
        
                      this.setState({ editDipData });
                    }} />
                  </FormGroup>  */}
        
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.updateDip.bind(this)}>Izmeni Diplomski</Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditDipModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ocena</th>
                      <th>Naziv teme</th>
                      <th>Datum odbrane</th>
                      <th>Email studenta</th>
                      <th>Email profesora</th>
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
                <br/>
               <form>
                <input type="text" className="d-inline p-2 bg-light text-black" placeholder="Filter" onChange={this.searchHandler} value = {this.state.term} />
               </form>
               <br/>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ocena</th>
                      <th>Naziv teme</th>
                      <th>Datum odbrane</th>
                      <th>Email studenta</th>
                      <th>Email profesora</th>
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