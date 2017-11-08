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
      console.log(json.searchSpecials);
      this.setState({
        allSpecials:json.searchSpecials
      })
    }.bind(this));
  };



  render() {
    const allSpecials = this.state.allSpecials.map((special) => {
      /*const type = `type => ${special.typeID}`;
      const name = `name => ${special.name}`;
      const price = `price => ${special.price}`;
      const description = `description => ${special.description}`;
      const quantity = `quantity => ${special.quantity}`;
      const pairings = `pairings => ${special.pairings}`;
      const ingredient = special.ingredient ? `ingredient => ${special.ingredient}` : ''*/
      const ingredient = special.ingredient ? special.ingredient : ''
      if (ingredient) {
        return [
          `type => ${special.typeID}`,
          `name => ${special.name}`,
          `price => ${special.price}`,
          `description => ${special.description}`,
          `quantity => ${special.quantity}`,
          `pairings => ${special.pairings}`,
          `ingredient => ${special.ingredient}`
        ];
      } else {
        return [
          `type => ${special.typeID}`,
          `name => ${special.name}`,
          `price => ${special.price}`,
          `description => ${special.description}`,
          `quantity => ${special.quantity}`,
          `pairings => ${special.pairings}`,
        ]
      }

    });
    return (
      <div className="container">
      {console.log(allSpecials)}
        <Helmet title="LibationsPrint" meta={[ { name: 'description', content: 'Description of LibationsPrint' }]}/>
          {allSpecials.map((allSpecial,index) => (
            <div>
              {console.log(`type:${allSpecial.type}`)}
              <div>DB::table('specials')->insert([</div>
              <div>{allSpecial.type},</div>
              <div>{allSpecial.name},</div>
              <div>{allSpecial.price},</div>
              <div>{allSpecial.description},</div>
              <div>{allSpecial.quantity},</div>
              <div>{allSpecial.pairings},</div>
              <div>{allSpecial.ingredient}</div>}
              <div>]);</div>
              <br />
            </div>
          ))}
          {allSpecials.map((allSpecial, index) => (
            <div>
              <div>DB::table('specials')->insert([</div>
              <div>{allSpecial.type},</div>
              <div>{allSpecial.name},</div>
              <div>{allSpecial.price},</div>
              <div>{allSpecial.description},</div>
              <div>{allSpecial.quantity},</div>
              <div>{allSpecial.pairings},</div>
              <div>{allSpecial.ingredient}</div>}
              <div>]);</div>
              <br />
            </div>
          ))}
      </div>
    );
  }
}


/*const addOne = x => x + 1;
const addTwo = (x,y) => {
  x = x + 1;
  y = y + 1;
  return x + y;
}*/





LibationsPrint.contextTypes = {
  router: React.PropTypes.object
};




/*{this.state.allSpecials.map((special,index)=>(
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
  <div><br/></div>*/
