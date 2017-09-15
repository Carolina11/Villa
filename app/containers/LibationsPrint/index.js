/*
 *
 * LibationsPrint
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class LibationsPrint extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="LibationsPrint" meta={[ { name: 'description', content: 'Description of LibationsPrint' }]}/>

        <div className="outLine">
          <h1>Libations</h1>
          <div className="specials">
            
            <div className="entrees">
              <h2>*** Entrees ***</h2>
            </div>
            <div className="desserts">
              <h2>*** Desserts ***</h2>
            </div>
            <div className="libations">
              <h2>Beer News<br />
              Samuel Adams Seasonal is ***</h2>
              <h2>Traveling Beer Tap is ***</h2>
            </div>
            <div className="notes">
              <h2></h2>
            </div>
          </div>
        </div>





      </div>
    );
  }
}

LibationsPrint.contextTypes = {
  router: React.PropTypes.object
};
