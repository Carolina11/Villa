/*
 *
 * Database
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import '../../globals.js'

import CheckToken from 'components/CheckToken';
import FaEdit from 'react-icons/lib/fa/edit';
import * as GLOBAL from '../../globals';

export default class Database extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      types: [],
      ingredients: [],
      menus: [],
      seasonalBeers: [],
      thisSeasonalBeer: '',
      listItems: [],
      lastSpecial:[],
      allSpecials: [],
      menuSpecials: [],
      name: '',
      description: '',
      quantity: '',
      type: '',
      ingredient: '',
      pairings: '',
      price: '',
      onMenu: '',
      special: [],
      showSpecials: [],
      editItem:'',
      updateItem: '',
      itemID:'',
      whichMenu: 0
    }
  }

  componentWillMount(){
    this.getTypes();
    this.getIngredients();
    this.getMenus();
    this.getSeasonalBeers();
  }
  componentDidMount(){
    this.disableEditButton();
  }

  disableEditButton = () => {
    document.getElementById('editButton').style.color = '#ccc';
    document.getElementById('editButton').style.backgroundColor = '#fff';
    document.getElementById('editButton').style.border = 'none';
    document.getElementById('editButton').style.boxShadow = 'none';
    document.getElementById('editButton').disabled = 'true';
  }

  getTypes = () => {
    fetch(GLOBAL.BASE_URL + '/api/getTypes', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        types:json.types
      })
    }.bind(this))
  };

  getIngredients = () => {
    fetch(GLOBAL.BASE_URL + '/api/getIngredients', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        ingredients:json.ingredients
      })
    }.bind(this))
  };

  getMenus = () => {
    fetch(GLOBAL.BASE_URL + '/api/getMenus', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        menus:json.menus
      })
    }.bind(this))
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
        seasonalBeers:json.seasonalBeers
      })
    }.bind(this))
  }

  updateSeasonalBeers = () => {
    let data = new FormData();
    data.append('id', this.state.id);
    data.append('beerName', this.state.beerName);

    fetch(GLOBAL.BASE_URL + '/api/updateSeasonalBeer', {
      method: 'POST',
      body:data
    })
    .then(function(response){
      return response.json();
    })
    this.getSeasonalBeers();
  }
  getLastSpecial = () => {

    fetch(GLOBAL.BASE_URL + '/api/getLastSpecial', {
      method: 'GET',
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      let showSpecials = [];
      showSpecials.push(json.lastSpecial);
      this.setState({
        showSpecials:showSpecials
      })
    }.bind(this))
  };


  getMenuSpecials = (onMenuID) => {
    fetch(GLOBAL.BASE_URL + '/api/getMenuSpecials?onMenuID=' + onMenuID, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.menuSpecials
      })
    }.bind(this));
  };

  searchSpecials = () => {
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('type', this.state.type);
    data.append('ingredient', this.state.ingredient);
    data.append('description', this.state.description);

    fetch(GLOBAL.BASE_URL + '/api/searchSpecials', {
      method: 'POST',
      body:data
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.searchSpecials
      })
    }.bind(this));
     this.setState({
      name: '',
      description: '',
      quantity: '',
      type: '',
      ingredient: '',
      onMenu: '',
      pairings: '',
      price: ''
    })
    document.getElementById("type").selectedIndex=0;
    document.getElementById("ingredient").selectedIndex=0;
  };


// fix this:
  editItem = (special) => {
    let showSpecials = [];
    showSpecials.push(special);

    this.setState({
      showSpecials:showSpecials,
      name: special.name,
      description: special.description,
      quantity: special.quantity,
      pairings: special.pairings,
      price: special.price
    })
    document.getElementById("type").selectedIndex=special.typeID;
    document.getElementById("ingredient").selectedIndex=special.ingredientID;

    document.getElementById('editButton').style.color = '';
    document.getElementById('editButton').style.backgroundColor = '';
    document.getElementById('editButton').style.border = '';
    document.getElementById('editButton').style.boxShadow = '';
    document.getElementById('editButton').disabled = '';

    document.getElementById('addButton').style.color = '#ccc';
    document.getElementById('addButton').style.backgroundColor = '#fff';
    document.getElementById('addButton').style.border = 'none';
    document.getElementById('addButton').style.boxShadow = 'none';
    document.getElementById('addButton').disabled = 'true';
    document.getElementById('searchButton').style.color = '#ccc';
    document.getElementById('searchButton').style.backgroundColor = '#fff';
    document.getElementById('searchButton').style.border = 'none';
    document.getElementById('searchButton').style.boxShadow = 'none';
    document.getElementById('searchButton').disabled = 'true';

    this.forceUpdate();
  };

  updateItem = (special) => {
    console.log(special);
    let data = new FormData();
    data.append('id', special[0].id);
    data.append('name', this.state.name);
    data.append('quantity', this.state.quantity);
    data.append('type', this.state.type);
    data.append('onMenu', special[0].onMenuID);
    data.append('ingredient', this.state.ingredient);
    data.append('description', this.state.description);
    data.append('pairings', this.state.pairings);
    data.append('price', this.state.price);

    console.log(special[0].id);
    console.log(this.state.name);

    fetch(GLOBAL.BASE_URL + '/api/updateItem', {
      method: 'POST',
      body: data
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.searchSpecials
      })
    }.bind(this));
    this.setState({
      name: '',
      price: '',
      quantity: '',
      description: '',
      pairings: ''
    })
    document.getElementById("type").selectedIndex=0;
    document.getElementById("ingredient").selectedIndex=0;

    document.getElementById('editButton').style.color = '#ccc';
    document.getElementById('editButton').style.backgroundColor = '#fff';
    document.getElementById('editButton').style.border = 'none';
    document.getElementById('editButton').style.boxShadow = 'none';
    document.getElementById('editButton').disabled = 'true';

    document.getElementById('addButton').style.color = '';
    document.getElementById('addButton').style.backgroundColor = '';
    document.getElementById('addButton').style.border = '';
    document.getElementById('addButton').style.boxShadow = '';
    document.getElementById('addButton').disabled = '';
    document.getElementById('searchButton').style.color = '';
    document.getElementById('searchButton').style.backgroundColor = '';
    document.getElementById('searchButton').style.border = '';
    document.getElementById('searchButton').style.boxShadow = '';
    document.getElementById('searchButton').disabled = '';
  }
  updateSeasonalBeer = (id) => {
    let data = new FormData();
    data.append('id', id);
    data.append('beerName', this.state.thisSeasonalBeer);

    fetch(GLOBAL.BASE_URL + '/api/updateSeasonalBeer', {
      method: 'POST',
      body: data
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      alert(json.beerNameUpdated + ' updated!');
    })
  }

  toggleMenu = (itemID, menuNum) => {
    let data = new FormData();
    data.append('id', itemID);
    data.append('onMenu', menuNum);

    fetch(GLOBAL.BASE_URL + '/api/toggleMenu', {
      method: 'POST',
      body: data
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.searchSpecials
      })
    }.bind(this));
  }

  renderHighlight = (special) => {
    console.log('special: ' + special.onMenu);

    if (!special.onMenu || special.onMenu === null || special.onMenu === 0)
    {
      return(
      <div>
        <a href="#" onClick={() => this.editItem(special)}><FaEdit/> Edit item</a><br/>
        <p>Add to menu:</p>
        <ul>
          <li><a href="#" onClick={() => this.toggleMenu(special.id,1)} >Lunch</a></li>
          <li><a href="#" onClick={() => this.toggleMenu(special.id,2)} >Dinner</a></li>
          <li><a href="#" onClick={() => this.toggleMenu(special.id,3)} >Libations</a></li>
        </ul>
      </div>
    )
    }
    else if(special.onMenu === 1) {
      return(
        <div>
          <a href="#" onClick={() => this.editItem(special)}><FaEdit/> Edit item</a><br/>
          <p>On menu:</p>
          <ul>
            <li><a href="#" onClick={() => this.toggleMenu(special.id,1)} style={{fontWeight:'bold'}}>Lunch</a></li>
            <li><a href="#" onClick={() => this.toggleMenu(special.id,0)} >Remove from menu</a></li>
          </ul>
        </div>
      )
    }
    else if(special.onMenu === 2) {
      return(
        <div>
          <a href="#" onClick={() => this.editItem(special)}><FaEdit/> Edit item</a><br/>
          <p>On menu:</p>
          <ul>
            <li><a href="#" onClick={() => this.toggleMenu(special.id,2)} style={{fontWeight:'bold'}}>Dinner</a></li>
            <li><a href="#" onClick={() => this.toggleMenu(special.id,0)} >Remove from menu</a></li>
          </ul>
        </div>
      )
    }
    else if(special.onMenu === 3) {
      return(
        <div>
          <a href="#" onClick={() => this.editItem(special)}><FaEdit/> Edit item</a><br/>
          <p>On menu:</p>
          <ul>
            <li><a href="#" onClick={() => this.toggleMenu(special.id,3)} style={{fontWeight:'bold'}}>Libations</a></li>
            <li><a href="#" onClick={() => this.toggleMenu(special.id,0)} >Remove from menu</a></li>
          </ul>
        </div>
      )
    }
  }

  countSpecials = () => {

    if(this.state.showSpecials === '')
    {
      return (
        <div className="specialItemDiv">
          <p>Sorry, no results.</p>
        </div>
      )
    }
    else if (this.state.showSpecials.length >= 1)
    {
      return (
        this.state.showSpecials.map((special,index)=>(
          <div className="specialItemDiv">
            <div className="editButtons">
            {this.renderHighlight(special)}
            </div>
            <div className="specialItem">
                <h3>{special.name} ... {special.price}</h3>
                <h2>{special.description}</h2>
                <div>
                  Type of dish: {special.type}<br/>Main ingredient: {special.ingredient}<br/>
                </div>
            </div>
          </div>
        )));
    }
    else if (!Array.isArray(this.state.showSpecials))
     {
        return (
          <div className="specialItemDiv">
            <div className="editButtons">
            <a href=""><FaEdit/></a> Edit item<br/>
            Add to menu:
            <input name="toMenu" value="1" type="radio" /> Lunch<br/>
            <input name="toMenu" value="2" type="radio" /> Dinner<br/>
            <input name="toMenu" value="3" type="radio" /> Libations<br/>
            </div>
            <div className="specialItem">
                <h3>get rid of this</h3>
                <h2>{this.state.showSpecials.description}</h2>
                <div>
                  Type of dish: {this.state.showSpecials.type}<br/>Main ingredient: {this.state.showSpecials.ingredient}
                </div>
            </div>
          </div>
      );
    }
  };

  storeItem = () => {
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('quantity', this.state.quantity);
    data.append('type', this.state.type);
    data.append('ingredient', this.state.ingredient);
    data.append('onMenu', 0);
    data.append('description', this.state.description);
    data.append('pairings', this.state.pairings);
    data.append('price', this.state.price);

    fetch(GLOBAL.BASE_URL + '/api/storeItem', {
      method: 'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.special);
      if(json.error != null) {
        alert(json.error);
      }
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
      if (!json.error){
      this.getLastSpecial();
      }
    }.bind(this));



    this.setState({
      name: '',
      description: '',
      quantity: '',
      type: '',
      ingredient: '',
      onMenu: '',
      pairings: '',
      price: ''
    })
    document.getElementById("type").selectedIndex=0;
    document.getElementById("ingredient").selectedIndex=0;
  };

  handleName = (event) =>{
    this.setState({
      name:event.target.value
    })
  };
  handleType = (event) =>{
    this.setState({
      type:event.target.value
    })
  };
  handleIngredient = (event) =>{
    this.setState({
      ingredient:event.target.value
    })
  };
  handleSeasonalBeer = (index, event) =>{
    document.getElementById('editButton').style.color = '#ccc';
    document.getElementById('editButton').style.backgroundColor = '#fff';
    document.getElementById('editButton').style.border = 'none';
    document.getElementById('editButton').style.boxShadow = 'none';
    document.getElementById('editButton').disabled = 'true';
    document.getElementById('addButton').style.color = '#ccc';
    document.getElementById('addButton').style.backgroundColor = '#fff';
    document.getElementById('addButton').style.border = 'none';
    document.getElementById('addButton').style.boxShadow = 'none';
    document.getElementById('addButton').disabled = 'true';
    document.getElementById('searchButton').style.color = '#ccc';
    document.getElementById('searchButton').style.backgroundColor = '#fff';
    document.getElementById('searchButton').style.border = 'none';
    document.getElementById('searchButton').style.boxShadow = 'none';
    document.getElementById('searchButton').disabled = 'true';

    let seasonalBeers = this.state.seasonalBeers;
    for(let i = 0; i < seasonalBeers.length; i++)
    {
      if(i === index) {
        seasonalBeers[i].beerName = event.target.value
      }
    }
    this.setState({
      thisSeasonalBeer:event.target.value,
      seasonalBeers:seasonalBeers
    }, function() {
      this.forceUpdate();
    })
  };

  handleOnMenu = (event) =>{
    this.setState({
      menu:event.target.value
    })
  };
  handleDescription = (event) =>{
    this.setState({
      description:event.target.value
    })
  };
  handlePairings = (event) =>{
    this.setState({
      pairings:event.target.value
    })
  };
  handlePrice = (event) =>{
    this.setState({
      price:event.target.value
    })
  };
  handleQuantity = (event) =>{
    this.setState({
      quantity:event.target.value
    })
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Database" meta={[ { name: 'description', content: 'Description of Database' }]}/>
        <ul className="menuUL">
          <li><a href="LunchPrint" target="_blank">Lunch Specials</a></li>
          <li><a href="DinnerPrint" target="_blank">Dinner Specials</a></li>
          <li><a href="LibationsPrint" target="_blank">Libations</a></li>
        </ul>
        <h1>Database items</h1>

        <div className="formDiv" id="formDiv">
            <h2><span className="required">* </span>Name</h2>
            <input type="text" className="name" id="name" placeholder="(Name of dish)" value={this.state.name} onChange={this.handleName} />

            <div className="dropDowns">

            <div className="priceDiv">
            <h2><span className="required">* </span>Price</h2>
            <input type="text" className="price" id="price" placeholder="(Price)"  value={this.state.price} onChange={this.handlePrice} />
            </div>

            <div className="quantityDiv">
              <h2>Quantity</h2>
              <input type="text" className="quantity" id="quantity" placeholder="(Quantity)" value={this.state.quantity} onChange={this.handleQuantity} />
            </div>

              <div>
              <h2><span className="required">* </span>Type of dish</h2>
              <select className="type" id="type" onChange={this.handleType} >
                <option value="0" defaultValue>(Type of dish)</option>
              {this.state.types.map((type,index)=>(
                <option value={type.id}>{type.name}</option>
              ))}
              </select>
              </div>

              <div>
              <h2>Main ingredient</h2>
              <select className="ingredient" id="ingredient" onChange={this.handleIngredient}>
                <option value="0" defaultValue>(Main ingredient)</option>
                {this.state.ingredients.map((ingredient,index)=>(
                  <option value={ingredient.id}>{ingredient.name}</option>
                ))}
              </select>
              </div>
            </div>


            <h2>Description</h2>

            <textarea className="description" id="description" placeholder="(Description)" value={this.state.description} onChange={this.handleDescription} ></textarea>
            <h2>Pairings</h2>
            <input type="text" className="pairings" id="pairing" placeholder="(Pairings)" value={this.state.pairings} onChange={this.handlePairings} />

            <div className="beersDiv">
              {this.state.seasonalBeers.map((beer,index)=>(
                <div>
                <h2>{beer.name}</h2><input type="text" value={beer.beerName} onChange={(event) => this.handleSeasonalBeer(index, event)}/><button onClick={() => this.updateSeasonalBeer(beer.id)}>update this beer</button>
                </div>
              ))}
            </div>

            <div className="buttonsDiv">
              <input type="submit" className="add" value="Add Item" id="addButton" onClick={this.storeItem} />
              <input type="submit" className="update" value="Update Item" id="editButton" onClick={() => this.updateItem(this.state.showSpecials)} />
              <input type="submit" className="search" value="Search" id="searchButton" onClick={this.searchSpecials} />
            </div>

            <div className="buttonsDiv">
              <input type="submit" className="lunchMenu" value="Current Lunch Menu" onClick={() => this.getMenuSpecials(1)} />
              <input type="submit" className="dinnerMenu" value="Current Dinner Menu" onClick={() => this.getMenuSpecials(2)} />
              <input type="submit" className="libationsMenu" value="Current Libations Menu" onClick={() => this.getMenuSpecials(3)} />
            </div>

        </div>
        <div className="results">
          <h1>Results</h1>
            <div>
              {this.countSpecials()}
              <br/>
              <br/>
            </div>
        </div>



      </div>
    );
  }
}

Database.contextTypes = {
  router: React.PropTypes.object
};
