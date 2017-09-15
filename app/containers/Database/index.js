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
      markedSpecials: [],
      dish: '',
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
    else if (this.state.showSpecials.length >= 1)
    {
      return (
        this.state.showSpecials.map((special,index)=>(
          <div className="specialItemDiv">
            <div className="editButtons">
            <a href=""><FaEdit/></a> Edit<br/>
            <form name="toMenuForm" action="#">
            <input name="toMenu" type="radio" /> Lunch<br/>
            <input name="toMenu" type="radio" /> Dinner<br/>
            <input name="toMenu" type="radio" /> Libations<br/>
            <input type="button" value="Reset Form" onClick="this.form.reset()" />
            </form>
            </div>
            <div className="specialItem">
              <p>
                <h3>{special.dish}</h3> Price: {special.price} Type of dish: {special.type}- ({special.type_name}) Main ingredient: {special.ingredient}-({special.ing_name})Description: {special.description}
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
            {this.state.showSpecials.dish} Price: {this.state.showSpecials.price} Type of dish: {this.state.showSpecials.type}- ({this.state.showSpecials.type_name}) Main ingredient: {this.state.showSpecials.ingredient}-({this.state.showSpecials.ing_name})Description: {this.state.showSpecials.description}
          </p>
        <div>
          <FaEdit/>
        </div>
      </div>
      );
    }
  };

  handleDish = (event) =>{
    this.setState({
      dish:event.target.value
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


  storeItem = () => {
    let data = new FormData();
    data.append('dish', this.state.dish);
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
      dish: '',
      description: '',
      type: '',
      ingredient: '',
      onMenu: '',
      pairings: '',
      price: ''
    })
    document.getElementById("type").selectedIndex=0;
    document.getElementById("ingredient").selectedIndex=0;
    document.getElementById("menu").selectedIndex=0;
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
            <input type="text" className="dish" id="dish" placeholder="(Name of dish)" value={this.state.dish} onChange={this.handleDish} />


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
                <option value={type.type_id}>{type.type_name}</option>
              ))}
              </select>
              </div>

              <div>
              <h2>Main ingredient</h2>
              <select className="ingredient" id="ingredient" onChange={this.handleIngredient}>
                <option value="0" defaultValue>(Main ingredient)</option>
                {this.state.ingredients.map((ingredient,index)=>(
                  <option value={ingredient.ing_id}>{ingredient.ing_name}</option>
                ))}
              </select>
              </div>
            </div>

            <div className="menus">
              <div className="selectMenu">
                <h2>Select menu</h2>
              </div>
              <select className="menu" id="menu" onChange={this.handleonMenu} >
                <option value="0" defaultValue>(Select menu)</option>
              {this.state.menus.map((menu,index)=>(
                <option value={menu.id}>{menu.menu_name}</option>
              ))}
              </select>
            </div>


            <h2>Description</h2>

            <textarea className="description" id="description" placeholder="(Description)" value={this.state.description} onChange={this.handleDescription} ></textarea>
            <h2>Pairings</h2>
            <input type="text" className="pairings" id="pairing" placeholder="(Pairings)" value={this.state.pairings} onChange={this.handlePairings} />


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
