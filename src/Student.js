import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export class Student extends Component {

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
        email: '',
        password: '',
        jmbg:'',
        ime:'',
        prezime:'',
        nivoStudija:'',
        brojIndeksa:'',
        datumUpisa:'',
        ulica: '',
        broj: '',
        IdSmera:''

      },
      editDipData: {
        email: '',
        jmbg:'',
        password:'',
        ime:'',
        prezime:'',
        nivoStudija:'',
        brojIndeksa:'',
        datumUpisa:'',
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
      axios.post('https://localhost:44310/Student/DodajStudenta/'+this.state.newDipData.IdSmera, this.state.newDipData)
      .then((response) => {
       // console.log(this.state.newDipData);
        let { dips } = this.state;
        dips.push(response.data);
  
        this.setState({ dips, newDipModal: false, newDipData: {
            email: '',password: '',jmbg:'',ime:'',prezime:'', nivoStudija:'',brojIndeksa:'',datumUpisa:'',ulica: '',broj: '',IdSmera:''
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
      ime,
      prezime,
      nivoStudija,
      brojIndeksa,
      datumUpisa,
      ulica,
      broj} = this.state.editDipData;
  
      axios.put('https://localhost:44310/Student/PromeniStudenta' , {
        email,password, jmbg, ime,prezime,nivoStudija,brojIndeksa,datumUpisa,ulica,broj
      }).then((response) => {
        this._refreshDips();
  
        this.setState({
          editDipModal: false, editDipData: {email: '',
          password:'',
          jmbg:'',
          ime:'',
          prezime:'',
          nivoStudija:'',
          brojIndeksa:'',
          datumUpisa:'',
          ulica: '',
          broj: ''}
        })
      }).catch(function (error) {
        alert("Podaci nisu dobro unešeni!");
        window.location.reload();
    });
    }
    editDip(email,password, jmbg, ime,prezime,nivoStudija,brojIndeksa,datumUpisa,ulica,broj) {
      this.setState({
        editDipData: { email,password, jmbg, ime,prezime,nivoStudija,brojIndeksa,datumUpisa,ulica,broj}, editDipModal: ! this.state.editDipModal
      });
    }
    deleteDip(email) {
      axios.delete('https://localhost:44310/Student/IzbrisiStudenta/' + email).then((response) => {
        this._refreshDips();
      });
    }
    _refreshDips() {
      axios.get('https://localhost:44310/Student/PreuzmiSveStudente').then((response) => {
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
            <td>{dip.ime}</td>
            <td>{dip.prezime}</td>
            <td>{dip.nivoStudija}</td>
            <td>{dip.brojIndeksa}</td>
            <td>{dip.datumUpisa}</td>
            <td>{dip.ulica}</td>
            <td>{dip.broj}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editDip.bind(this, dip.email,dip.password, dip.jmbg,dip.ime,dip.prezime,dip.nivoStudija,dip.brojIndeksa,dip.datumUpisa,dip.ulica,dip.broj)}>Izmeni</Button>
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
              <td>{dip.ime}</td>
              <td>{dip.prezime}</td>
              <td>{dip.nivoStudija}</td>
              <td>{dip.brojIndeksa}</td>
              <td>{dip.datumUpisa}</td>
              <td>{dip.ulica}</td>
              <td>{dip.broj}</td>
              <td>{dip.upisaoSmerr.nazivSmera}</td>
            </tr>
          )
        }
        });
      if(this.state.loggedIn === true){
              return (
                <div className="App container">

                <Button className="my-3" color="primary" onClick={this.toggleNewDipModal.bind(this)}>Dodaj studenta</Button>
          
                <Modal isOpen={this.state.newDipModal} toggle={this.toggleNewDipModal.bind(this)}>
                  <ModalHeader toggle={this.toggleNewDipModal.bind(this)}>Dodaj novog studenta</ModalHeader>
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
                      <Label for="ime">Ime:</Label>
                      <Input id="ime" value={this.state.newDipData.ime} onChange={(e) => {
                        let { newDipData } = this.state;
          
                        newDipData.ime = e.target.value;
          
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
                      <Label for="nivoStudija">Nivo Studija:</Label>
                      <Input id="nivoStudija" value={this.state.newDipData.nivoStudija} onChange={(e) => {
                        let { newDipData } = this.state;
          
                        newDipData.nivoStudija = e.target.value;
          
                        this.setState({ newDipData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="brojIndeksa">Broj Indeksa:</Label>
                      <Input id="brojIndeksa" value={this.state.newDipData.brojIndeksa} onChange={(e) => {
                        let { newDipData } = this.state;
          
                        newDipData.brojIndeksa = e.target.value;
          
                        this.setState({ newDipData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="datumUpisa">Datum upisa:</Label>
                      <Input type="date" id="datumUpisa" value={this.state.newDipData.datumUpisa} onChange={(e) => {
                        let { newDipData } = this.state;
          
                        newDipData.datumUpisa = e.target.value;
          
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
                      <FormGroup>
                      <Label for="IdSmera">Id Smera:</Label>
                      <Input id="IdSmera" value={this.state.newDipData.IdSmera} onChange={(e) => {
                        let { newDipData } = this.state;
          
                        newDipData.IdSmera = e.target.value;
          
                        this.setState({ newDipData });
                      }} />
                    </FormGroup>

                    </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addDip.bind(this)}>Dodaj studenta</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewDipModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                </Modal>
          
                <Modal isOpen={this.state.editDipModal} toggle={this.toggleEditDipModal.bind(this)}>
                  <ModalHeader toggle={this.toggleEditDipModal.bind(this)}>Izmeni studenta</ModalHeader>
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
                      <Label for="ime">Ime:</Label>
                      <Input id="ime" value={this.state.editDipData.ime} onChange={(e) => {
                        let { editDipData } = this.state;
          
                        editDipData.ime = e.target.value;
          
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
                      <Label for="nivoStudija">Nivo studija:</Label>
                      <Input id="nivoStudija" value={this.state.editDipData.nivoStudija} onChange={(e) => {
                        let { editDipData } = this.state;
          
                        editDipData.nivoStudija = e.target.value;
          
                        this.setState({ editDipData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="brojIndeksa">Broj Indeksa:</Label>
                      <Input id="brojIndeksa" value={this.state.editDipData.brojIndeksa} onChange={(e) => {
                        let { editDipData } = this.state;
          
                        editDipData.brojIndeksa = e.target.value;
          
                        this.setState({ editDipData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="datumUpisa">Datum upisa:</Label>
                      <Input type="date" id="datumUpisa" onChange={(e) => {
                        let { editDipData } = this.state;
          
                        editDipData.datumUpisa = e.target.value;
          
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
                    <Button color="primary" onClick={this.updateDip.bind(this)}>Izmeni Studenta</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditDipModal.bind(this)}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                  <Table>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th>JMBG</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Studije</th>
                        <th>Indeks</th>
                        <th>Datum Upisa</th>
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
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Studije</th>
                        <th>Indeks</th>
                        <th>Datum Upisa</th>
                        <th>Ulica</th>
                        <th>Broj</th>
                        <th>Naziv Smera</th>
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