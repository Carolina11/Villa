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
      listItems: [],
      lastSpecial:[],
      allSpecials: [],
      markedSpecials: [],
      name: '',
      description: '',
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

  getAllSpecials = () => {
    fetch('http://localhost:8000/api/getAllSpecials', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.allSpecials,
      })
    }.bind(this))
  };

  getMarkedSpecials = () => {
    fetch('http://localhost:8000/api/getMarkedSpecials', {
      method: 'get'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      this.setState({
        showSpecials:json.markedSpecials
      })
    }.bind(this))
  };

  countSpecials = () => {
    if(this.state.showSpecials === '')
    {
      return (
        <div>

        </div>
      )
    }
    else if (this.state.showSpecials.length > 1)
    {
      return (
        this.state.showSpecials.map((special,index)=>(
          <div className="specialItem"><p><FaEdit/> {special.name} : {special.description}</p></div>
        )));
    }
    else if (!Array.isArray(this.state.showSpecials))
     {
        return (
        <div className="specialItem"><p><FaEdit/> {this.state.showSpecials.name} - {this.state.showSpecials.description}</p></div>
      );
    }
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
  handleOnMenu = (event) =>{
    this.setState({
      onMenu:event.target.value
    })
  };

  storeItem = () => {
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('type', this.state.type);
    data.append('ingredient', this.state.ingredient);
    data.append('description', this.state.description);
    data.append('pairings', this.state.pairings);
    data.append('price', this.state.price);
    data.append('onMenu', this.state.onMenu);

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
      type: '',
      ingredient: '',
      pairings: '',
      price: '',
      onMenu: ''
    })
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Database" meta={[ { name: 'description', content: 'Description of Database' }]}/>
        <ul className="menuUL">
          <li><a href="LunchPrint" target="_blank">Lunch Specials</a></li>
          <li><a href="DinnerPrint" target="_blank">Dinner Specials</a></li>
        </ul>
        <h1>Database items</h1>

        <div className="formDiv" id="formDiv">
            <h2>Name</h2>
            <input type="text" className="name" id="name" placeholder="(Name of dish)" value={this.state.name} onChange={this.handleName} />


            <div className="dropDowns">

            <div className="priceDiv">
            <h2>Price</h2>
            <input type="text" className="price" id="price" placeholder="(Price)"  value={this.state.price} onChange={this.handlePrice} />
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

            <div className="alignDiv">
              <div>
                <span>Check for menu - -></span><input type="checkbox" className="onMenu" id="onMenu" value={this.state.onMenu} onChange={this.handleOnMenu} />
              </div>
            </div>

            <div className="buttonsDiv">
              <input type="submit" className="add" value="Add Item" onClick={this.storeItem} />
              <input type="submit" className="update" value="Update Item" onClick="" />
              <input type="submit" className="current" value="Current Menu" onClick="" />
              <input type="submit" className="search" value="Search" onClick={this.getAllSpecials} />
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
