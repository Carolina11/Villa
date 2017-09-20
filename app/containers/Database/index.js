/*
 *
 * Database
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import FaEdit from 'react-icons/lib/fa/edit';

import './style.css';
import './styleM.css';

export default class Database extends React.PureComponent {
  constructor() {
    super();
    this.state={
      types: [],
      ingredients: [],
      menus: [],
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
      showSpecials: '',
    }
  }

  componentWillMount(){
    this.getTypes();
    this.getIngredients();
    this.getMenus();
  }

  getTypes = () => {
    fetch('http://localhost:8000/api/getTypes', {
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
    fetch('http://localhost:8000/api/getIngredients', {
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
    fetch('http://localhost:8000/api/getMenus', {
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


  getLastSpecial = () => {
    fetch('http://localhost:8000/api/getLastSpecial', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.lastSpecial
      })
    }.bind(this))
  };


  getMenuSpecials = (onMenuID) => {
    fetch('http://localhost:8000/api/getMenuSpecials?onMenuID=' + onMenuID, {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.menuSpecials
      })
    }.bind(this))
  };

  searchSpecials = () => {
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('type', this.state.type);
    data.append('ingredient', this.state.ingredient);
    data.append('description', this.state.description);

    fetch('http://localhost:8000/api/searchSpecials', {
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
            <a href=""><FaEdit/></a> Edit<br/>
            <form name="toMenuForm" action="#">
            <input name="toMenu" value="1" type="radio" /> Lunch<br/>
            <input name="toMenu" value="2" type="radio" /> Dinner<br/>
            <input name="toMenu" value="3" type="radio" /> Libations<br/>
            <input type="button" value="Reset Form" onClick="this.form.reset()" />
            </form>
            </div>
            <div className="specialItem">
              <p>
                <h3>{special.name}</h3> Price: {special.price} Type of dish: {special.type}- ({special.name}) Main ingredient: {special.ingredient}-({special.name})Description: {special.description}<br/> {this.special}
              </p>
            </div>
          </div>

        )));
    }
    else if (!Array.isArray(this.state.showSpecials))
     {
        return (
        <div className="specialItem">
          <p>
            {this.state.showSpecials.name} Price: {this.state.showSpecials.price} Type of dish: {this.state.showSpecials.type}- ({this.state.showSpecials.name}) Main ingredient: {this.state.showSpecials.ingredient}-({this.state.showSpecials.name})Description: {this.state.showSpecials.description}
          </p>
        <div>
          <FaEdit/>
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
    data.append('onMenu', this.state.onMenu);
    data.append('description', this.state.description);
    data.append('pairings', this.state.pairings);
    data.append('price', this.state.price);

    fetch('http://localhost:8000/api/storeItem', {
      method: 'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.special);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this));
    this.getLastSpecial();
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
            <h2>Name</h2>
            <input type="text" className="name" id="name" placeholder="(Name of name)" value={this.state.name} onChange={this.handleName} />


            <div className="dropDowns">

            <div className="priceDiv">
            <h2>Price</h2>
            <input type="text" className="price" id="price" placeholder="(Price)"  value={this.state.price} onChange={this.handlePrice} />
            </div>

            <div className="quantityDiv">
              <h2>Quantity</h2>
              <input type="text" className="quantity" id="quantity" placeholder="(Quantity)" value={this.state.quantity} onChange={this.handleQuantity} />
            </div>

              <div>
              <h2>Type of dish</h2>
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


            <div className="buttonsDiv">
              <input type="submit" className="add" value="Add Item" onClick={this.storeItem} />
              <input type="submit" className="update" value="Update Item" onClick="" />
              <input type="submit" className="search" value="Search" onClick={this.searchSpecials} />
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
            </div>
        </div>



      </div>
    );
  }
}

Database.contextTypes = {
  router: React.PropTypes.object
};
