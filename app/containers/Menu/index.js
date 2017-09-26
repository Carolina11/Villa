/*
 *
 * Menu
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

import CheckToken from 'components/CheckToken';

export default class Menu extends React.PureComponent {


  render() {
    return (
      <div className="container">
        
        <Helmet title="Menu" meta={[ { name: 'description', content: 'Description of Menu' }]}/>



          <div className="mainDiv">

            <div className="titleDiv">
              <h1>Villa Europa</h1><br />
            </div>
            <div className="menuDiv">
              <div className="menuItem"><a href="Database">Database</a></div>
              <div className="menuItem"><a href="LunchPrint" target="_blank">Current<br/>Lunch Specials</a></div>
              <div className="menuItem"><a href="DinnerPrint" target="_blank">Current<br/>Dinner Specials</a></div>
              <div className="menuItem"><a href="LibationsPrint" target="_blank">Current<br/>Libations Specials</a></div>
            </div>
            <div className="imageDiv">
              <img className="villaImg" src={require('../../images/villa01.jpg')} />
            </div>


          </div>


      </div>
    );
  }
}

Menu.contextTypes = {
  router: React.PropTypes.object
};
