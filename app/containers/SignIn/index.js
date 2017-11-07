/*
 *
 * SignIn
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import * as GLOBAL from '../../globals';

export default class SignIn extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name:"",
      email:"",
      password:"",
    }
  }

  handleEmail = (event) => {
    this.setState ({
      email:event.target.value
    })
  }
  handlePassword = (event) => {
    this.setState ({
      password:event.target.value
    })
  }
  signIn = () => {
    let _this = this;
    let data = new FormData();

    data.append('email', this.state.email);
    data.append('password', this.state.password);

    fetch (GLOBAL.BASE_URL + '/api/signIn',{
      method: 'POST',
      body: data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      if(json.error)
      {
        alert(json.error);
      }
      else if(json.token)
      {
        sessionStorage.setItem('token', json.token);

        _this.getUser(json.token);
      }
    }.bind(this))
  }

  getUser = (token) => {
   fetch(GLOBAL.BASE_URL + '/api/getUser', {
     method: 'GET',
     headers:{'Authorization':'Bearer ' + token}
   })
   .then(function(response){
     return response.json();
   })
   .then(function(json){
     sessionStorage.setItem('user', JSON.stringify(json.user));
       alert(JSON.stringify(json.user));

   }.bind(this))

    window.location = 'Menu';

}


  render() {
    return (
      <div className="container">
        <Helmet title="SignUp" meta={[ { name: 'description', content: 'Description of SignUp' }]}/>

        <div className="mainDiv">

        <div className="titleDiv">
          <h1>Villa Europa</h1><br />
        </div>
        <div className="imageDiv">
          <img className="villaImg" src={require('../../images/villa01.jpg')} />
        </div>

        <div className="menuDiv">
          <input type="text" className="email" id="email"  placeholder="(email)" value={this.state.email} onChange={this.handleEmail} onKeyDown="" />
          <input type="password" className="password" id="password"  placeholder="(password)" onChange={this.handlePassword} onKeyDown="" />
          <input type="submit" className="signUPButton" value="Submit" onClick={this.signIn} />

        </div>

        </div>

      </div>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object
};
