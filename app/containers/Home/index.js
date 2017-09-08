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

        <div className="mainContainer">
          <img className="villaImg" src={require('../../images/villa01.jpg')} />
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
