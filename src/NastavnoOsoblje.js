import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export class NastavnoOsoblje extends Component {

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
        email: '',
        password: '',
        jmbg:'',
        lime:'',
        imeRoditelja:'',
        prezime:'',
        datumRodjenja:'',
        ulica: '',
        broj: ''

      },
      editDipData: {
        email: '',
        jmbg:'',
        password:'',
        lime:'',
        imeRoditelja:'',
        prezime:'',
        datumRodjenja:'',
        ulica: '',
        broj: ''
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
      axios.post('https://localhost:44310/NastavnoOsoblje/DodajNastavnika', this.state.newDipData)
      .then((response) => {
       // console.log(this.state.newDipData);
        let { dips } = this.state;
        dips.push(response.data);
  
        this.setState({ dips, newDipModal: false, newDipData: {
            email: '',password: '',jmbg:'',lime:'',imeRoditelja:'',prezime:'',datumRodjenja:'',ulica: '',broj: ''
        }});
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }
    updateDip() {
      let {email,
        password,
      jmbg,
      lime,
      imeRoditelja,
      prezime,
      datumRodjenja,
      ulica,
      broj} = this.state.editDipData;
  
      axios.put('https://localhost:44310/NastavnoOsoblje/PromeniNastavnoOsoblje' , {
        email,password, jmbg, lime,imeRoditelja, prezime,datumRodjenja,ulica,broj
      }).then((response) => {
        this._refreshDips();
  
        this.setState({
          editDipModal: false, editDipData: {email: '',
          password:'',
          jmbg:'',
          lime:'',
          imeRoditelja:'',
          prezime:'',
          datumRodjenja:'',
          ulica: '',
          broj: ''}
        })
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }
    editDip(email,password ,jmbg, lime,imeRoditelja, prezime,datumRodjenja,ulica,broj) {
      this.setState({
        editDipData: { email,password ,jmbg, lime,imeRoditelja, prezime,datumRodjenja,ulica,broj}, editDipModal: ! this.state.editDipModal
      });
    }
    deleteDip(email) {
      axios.delete('https://localhost:44310/NastavnoOsoblje/IzbrisiNastavnoOsoblje/' + email).then((response) => {
        this._refreshDips();
      });
    }
    _refreshDips() {
      axios.get('https://localhost:44310/NastavnoOsoblje/PreuzmiSveNastavnike').then((response) => {
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
            <td>{dip.email}</td>
            <td>{dip.password}</td>
            <td>{dip.jmbg}</td>
            <td>{dip.lime}</td>
            <td>{dip.imeRoditelja}</td>
            <td>{dip.prezime}</td>
            <td>{dip.datumRodjenja}</td>
            <td>{dip.ulica}</td>
            <td>{dip.broj}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editDip.bind(this, dip.email,dip.password, dip.jmbg,dip.lime,dip.imeRoditelja,dip.prezime,dip.datumRodjenja,dip.ulica,dip.broj)}>Izmeni</Button>
              <Button color="danger" size="sm" onClick={this.deleteDip.bind(this, dip.email)}>Izbriši</Button>
            </td>
          </tr>
        )
        }
        else{
          return (
            <tr key={index}>
              <td>{dip.email}</td>
              <td>{dip.jmbg}</td>
              <td>{dip.lime}</td>
              <td>{dip.imeRoditelja}</td>
              <td>{dip.prezime}</td>
              <td>{dip.datumRodjenja}</td>
              <td>{dip.ulica}</td>
              <td>{dip.broj}</td>
            </tr>
          )
        }
        });
     if(this.state.loggedIn === true){  
          return (
            <div className="App container">

            <Button className="my-3" color="primary" onClick={this.toggleNewDipModal.bind(this)}>Dodaj profesora</Button>
      
            <Modal isOpen={this.state.newDipModal} toggle={this.toggleNewDipModal.bind(this)}>
              <ModalHeader toggle={this.toggleNewDipModal.bind(this)}>Dodaj novog profesora</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="email">Email:</Label>
                  <Input id="email" value={this.state.newDipData.email} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.email = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password:</Label>
                  <Input id="password" value={this.state.newDipData.password} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.password = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>   
                <FormGroup>
                  <Label for="jmbg">JMBG:</Label>
                  <Input id="jmbg" value={this.state.newDipData.jmbg} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.jmbg = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="lime">Lično ime:</Label>
                  <Input id="lime" value={this.state.newDipData.lime} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.lime = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="imeRoditelja">Ime roditelja:</Label>
                  <Input id="imeRoditelja" value={this.state.newDipData.imeRoditelja} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.imeRoditelja = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="prezime">Prezime:</Label>
                  <Input id="prezime" value={this.state.newDipData.prezime} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.prezime = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="datumRodjenja">Datum rodjenja:</Label>
                  <Input type="date" id="datumRodjenja" value={this.state.newDipData.datumRodjenja} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.datumRodjenja = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="ulica">Ulica:</Label>
                  <Input id="ulica" value={this.state.newDipData.ulica} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.ulica = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                  </FormGroup>
                  <FormGroup>
                  <Label for="broj">Broj:</Label>
                  <Input id="broj" value={this.state.newDipData.broj} onChange={(e) => {
                    let { newDipData } = this.state;
      
                    newDipData.broj = e.target.value;
      
                    this.setState({ newDipData });
                  }} />
                  </FormGroup>

                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addDip.bind(this)}>Dodaj profesora</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewDipModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
            </Modal>
      
            <Modal isOpen={this.state.editDipModal} toggle={this.toggleEditDipModal.bind(this)}>
              <ModalHeader toggle={this.toggleEditDipModal.bind(this)}>Izmeni profesora</ModalHeader>
              <ModalBody>
              <FormGroup>
                  <Label for="password">Password:</Label>
                  <Input id="password" value={this.state.editDipData.password} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.password = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="jmbg">JMBG:</Label>
                  <Input id="jmbg" value={this.state.editDipData.jmbg} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.jmbg = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="lime">Lično ime:</Label>
                  <Input id="lime" value={this.state.editDipData.lime} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.lime = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="imeRoditelja">Ime roditelja:</Label>
                  <Input id="imeRoditelja" value={this.state.editDipData.imeRoditelja} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.imeRoditelja = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="prezime">Prezime:</Label>
                  <Input id="prezime" value={this.state.editDipData.prezime} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.prezime = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="datumRodjenja">Datum rodjenja:</Label>
                  <Input type="date" id="datumRodjenja" onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.datumRodjenja = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="ulica">Ulica:</Label>
                  <Input id="ulica" value={this.state.editDipData.ulica} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.ulica = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>
                <FormGroup>
                  <Label for="broj">Broj:</Label>
                  <Input id="broj" value={this.state.editDipData.broj} onChange={(e) => {
                    let { editDipData } = this.state;
      
                    editDipData.broj = e.target.value;
      
                    this.setState({ editDipData });
                  }} />
                </FormGroup>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateDip.bind(this)}>Izmeni Profesora</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditDipModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
              <Table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Password</th>
                    <th>JMBG</th>
                    <th>LIme</th>
                    <th>Ime Roditelja</th>
                    <th>Prezime</th>
                    <th>Datum Rodjenja</th>
                    <th>Ulica</th>
                    <th>Broj</th>
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
                    <th>Email</th>
                    <th>JMBG</th>
                    <th>LIme</th>
                    <th>Ime Roditelja</th>
                    <th>Prezime</th>
                    <th>Datum Rodjenja</th>
                    <th>Ulica</th>
                    <th>Broj</th>
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