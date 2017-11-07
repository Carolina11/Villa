/*
 *
 * LunchPrint
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

import CheckToken from 'components/CheckToken';

export default class LunchPrint extends React.PureComponent {

  constructor() {
    super();
    this.state={
      getDate: '',
      showSpecials: [],
      soups: [],
      appetizers: [],
      entrees: [],
      desserts: [],
      beers: [],
      seasonalBeers: [],
      isLoading:true,
      countDesserts: 0,
      countNotes: 0
    }
  };

  getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd = '0'+dd
    }
    if(mm<10) {
      mm = '0'+mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    return(
      <div className="date">
        {today}
      </div>
    );
  };

  componentWillMount(){
    this.getSoups();
    this.getAppetizers();
    this.getEntrees();
    this.getDesserts();
    this.getBeers();
    this.getSeasonalBeers();
  };

  getSoups = () => {
    fetch(GLOBAL.BASE_URL + '/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 1, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        soups:json.menuSpecials
      })
    }.bind(this));
  };

  getAppetizers = () => {
    fetch(GLOBAL.BASE_URL + '/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 2, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        appetizers:json.menuSpecials
      })
    }.bind(this));
    return (
      this.state.appetizers.map((special,index)=>(
          <div className="specialItem">
              <h2>{special.name} ... {special.price}</h2>
              <h3>{special.description}</h3>
          </div>
      )));
  };

  getEntrees = () => {
    fetch(GLOBAL.BASE_URL + '/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 3, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        entrees:json.menuSpecials
      })
    }.bind(this));
  };

  getDesserts = () => {
    fetch(GLOBAL.BASE_URL + '/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 4, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        desserts:json.menuSpecials,
        countDesserts:json.menuSpecials.length
      })
    }.bind(this));
  };

  showDesserts = () => {
    if(this.state.countDesserts !== 0){
      return(
        <div className="desserts" id="desserts">
           <h2>* * * Desserts * * *</h2>
           {this.state.desserts.map((dessert, index) => (
          <div className="specialItem">
          <h3>{dessert.name} ... {dessert.price}</h3>
          <h4>{dessert.description}</h4>
          </div>
        ))}
        </div>
      )
    }
  }


  getBeers = () => {
    fetch(GLOBAL.BASE_URL + '/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 5, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        beers:json.menuSpecials
      })
    }.bind(this));
  };

  getSeasonalBeers = () => {
    fetch(GLOBAL.BASE_URL + '/api/getSeasonalBeers', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        seasonalBeers:json.seasonalBeers,
        isLoading:false
      })
    }.bind(this));
  }


  render() {
    if(this.state.isLoading) {
      return(
        <div></div>
      )
    }
    else {
      return (
        <div className="container">
          <Helmet title="LunchPrint" meta={[ { name: 'description', content: 'Description of LunchPrint' }]}/>

          <div className="outLine">
            <h1>Lunch Extras</h1><br/>
            <div className="specials">
              <div className="firsts">
                {this.state.soups.map((soup, index) => (
                  <div className="specialItem">
                  <h2>Soups of the Day: Our Famous Potato or {soup.name}</h2>
                  </div>
                ))}<br/>
                <h2>* * * Appetizers * * *</h2>
                {this.state.appetizers.map((appetizer, index) => (
                  <div className="specialItem">
                  <h3>{appetizer.name} ... {appetizer.price}</h3>
                  <h4>{appetizer.description}</h4>
                  </div>
                  ))}
              </div>

                <div className="entrees">
                  <h2>* * * Entrees * * *</h2>
                  {this.state.entrees.map((entree, index) => (
                  <div className="specialItem">
                  <h3>{entree.name} ... {entree.price}</h3>
                  <h4>{entree.description}</h4>
                  </div>
                ))}
                  <h3>Entrée specials served with salad or cup of Soup of the Day, and bread, unless otherwise noted. Our fabulous stuffed potato is 1.75 additional charge when available.</h3>
                </div>

                {this.showDesserts()}

                <div className="beers">
                  <h2>* * * Beer News * * *</h2>
                  <h3>Samuel Adams Seasonal is {this.state.seasonalBeers[0].beerName}</h3><h3>Traveling Beer Tap is {this.state.seasonalBeers[1].beerName}</h3>
                  {this.state.beers.map((beer, index) => (
                 <div className="specialItem">
                 <h3>{beer.name} ... {beer.price}</h3>
                 <h4>{beer.description}</h4>
                 </div>
               ))}
                </div>
              {this.getDate()}
            </div>
         </div>
      </div>
      );
    }
  }
}

LunchPrint.contextTypes = {
  router: React.PropTypes.object
};
