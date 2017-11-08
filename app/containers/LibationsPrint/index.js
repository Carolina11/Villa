/*
 *
 * LibationsPrint
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import * as GLOBAL from '../../globals';

export default class LibationsPrint extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      allSpecials: []
    }
  }
  componentWillMount() {
    this.getAllSpecials();
  }

  getAllSpecials = () => {
    fetch(GLOBAL.BASE_URL + '/api/searchSpecials', {
      method: 'post'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        allSpecials:json.searchSpecials
      })
    }.bind(this));
  };



  render() {
    this.state.allSpecials.map((special,index)=>(
        `type => ${special.typeID}`,
        `name => ${special.name}`,
        `price => ${special.price}`,
        `description => ${special.description}`,
        `quantity => ${special.quantity}`,
        `pairings => ${special.pairings}`,

        special.ingredient
        ]);
  ))
    return (
      <div className="container">
        <Helmet title="LibationsPrint" meta={[ { name: 'description', content: 'Description of LibationsPrint' }]}/>

          {this.state.allSpecials.map((special,index)=>(
            <div>
              <div>DB::table('specials')->insert([</div>
              <div>'type' => '{special.typeID}',</div>
              <div>'name' => '{special.name}',</div>
              <div>'price' => '{special.price}',</div>
              <div>'description' => '{special.description}',</div>
              <div>'quantity' => '{special.quantity}',</div>
              <div>'pairings' => '{special.pairings}',</div>

              <div>'ingredient' => '{special.ingredient ? special.ingredient : null }',</div>

              <div>]);</div>
              <div><br/></div>
            </div>
        ))}




      </div>
    );
  }
}

LibationsPrint.contextTypes = {
  router: React.PropTypes.object
};
