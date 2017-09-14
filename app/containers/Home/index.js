/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>


        <div className="mainDiv">

        <div className="titleDiv">
          <h1>Villa Europa</h1><br />
        </div>
        <div className="linksDiv">
        <span><a href="SignIn">Sign in</a></span> <span><a href="SignUp">Sign up</a></span>
        </div>
        <div className="imageDiv">
          <img className="villaImg" src={require('../../images/villa01.jpg')} />
        </div>


        </div>



      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
