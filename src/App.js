//import logo from './logo.svg';
import './App.css';

import { Smer } from './Smer';
import {Navigation} from './Navigation';
import { DiplomskiRad } from './DiplomskiRad';
import { Predmet } from './Predmet';
import { UciNa } from './UciNa';
import { NastavnoOsoblje } from './NastavnoOsoblje';
import { AngazovanNa } from './AngazovanNa';
import { Student } from './Student';
import { Administracija } from './Administracija';
import { Login } from './Login';
import { Logout } from './Logout';
import {Footer} from './Footer';
import { AddDiplomski } from './AddDiplomski';
import { LogoutProf } from './LogoutProf';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <div className="content-wrap">
      <h5 className="m-3 d-flex justify-content-center">
        Diplomski Radovi
      </h5>

      <Navigation/>

      <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/DiplomskiRad' component={DiplomskiRad} exact/>
        <Route path='/Smer' component={Smer} exact/>
        <Route path='/Predmet' component={Predmet} exact/>
        <Route path='/UciNa' component={UciNa} exact/>
        <Route path='/NastavnoOsoblje' component={NastavnoOsoblje} exact/>
        <Route path='/AngazovanNa' component={AngazovanNa} exact/>
        <Route path='/Student' component={Student} exact/>
        <Route path='/Administracija' component={Administracija} exact/>
        <Route path='/Logout' component={Logout} exact/>
        <Route path='/AddDiplomski' component={AddDiplomski} exact/>
        <Route path='/LogoutProf' component={LogoutProf} exact/>
      </Switch>
    </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
