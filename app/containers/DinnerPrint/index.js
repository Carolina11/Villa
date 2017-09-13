/*
 *
 * DinnerPrint
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class DinnerPrint extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="DinnerPrint" meta={[ { name: 'description', content: 'Description of DinnerPrint' }]}/>

        <div className="outLine">
          <h1>Evening Extras</h1>
          <div className="specials">
            <div className="firsts">
              <h2>Soup of the Day: Our famous Potato or *** </h2>
              <h2>*** Appetizers ***</h2>
            </div>
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

DinnerPrint.contextTypes = {
  router: React.PropTypes.object
};
