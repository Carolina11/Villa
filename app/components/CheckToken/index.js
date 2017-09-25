/**
*
* CheckToken
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class CheckToken extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      token: sessionStorage.getItem('token')
    }
  }

  componentWillMount() {
    if(!this.state.token || this.state.token == undefined) {
      this.context.router.push('/');
    }
  }
  
}

CheckToken.contextTypes = {
  router: React.PropTypes.object
};
