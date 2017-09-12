/*
 *
 * SignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class SignUp extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name:"",
      email:"",
      password:"",
    }
  }
  handleName = (event) => {
    this.setState ({
      name:event.target.value
    })
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
  storeUser = () => {
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    data.append('password', this.state.password);

    fetch('http://localhost:8000/api/signUp', {
      method: 'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error)
      {
        alert(json.error);
      }
       else if (json.success)
      {
        alert(json.success);
        this.signIn();
      }
    }.bind(this))
  };

  signIn = () => {

    let data = new FormData();

    data.append('email', this.state.email);
    data.append('password', this.state.password);

    fetch ('http://localhost:8000/api/signIn',{
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
      else if (json.token)
      {
        sessionStorage.setItem('token', json.token)
        this.getUser(json.token);
      }
    }.bind(this))
  };

  getUser = (token) => {

   fetch('http://localhost:8000/api/getUser', {
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
 };

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
          <input type="text" className="name" id="name"  placeholder="(name)" value={this.state.name} onChange={this.handleName} onKeyDown="" />
          <input type="text" className="email" id="email"  placeholder="(email)" value={this.state.email} onChange={this.handleEmail} onKeyDown="" />
          <input type="text" className="password" id="password"  placeholder="(password)" value={this.state.password} onChange={this.handlePassword} onKeyDown="" />
          <input type="submit" className="signUPButton" value="Submit" onClick={this.storeUser} />

        </div>

        </div>

      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
};
