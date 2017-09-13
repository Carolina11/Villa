/*
 *
 * Menu
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

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
              <div className="menuItem"><a href="LunchPrint">Lunch Specials</a></div>
              <div className="menuItem"><a href="DinnerPrint">Dinner Specials</a></div>
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
