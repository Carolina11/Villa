/*
 *
 * Database
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Database extends React.PureComponent {
  constructor() {
    super();
    this.state={
      types:[],
      ingredients:[],
      newItem:[],
      listItems:[],
      name: '',
      description: '',
      type: '',
      ingredient: '',
      pairings: '',
      price: '',
      onMenu:'',
      special: []
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
  }

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
  }

  handleName = (event) =>{
    this.setState({
      name:event.target.value
    })
  }
  handleType = (event) =>{
    this.setState({
      type:event.target.value
    })
  }
  handleIngredient = (event) =>{
    this.setState({
      ingredient:event.target.value
    })
  }
  handleDescription = (event) =>{
    this.setState({
      description:event.target.value
    })
  }
  handlePairings = (event) =>{
    this.setState({
      pairings:event.target.value
    })
  }
  handlePrice = (event) =>{
    this.setState({
      price:event.target.value
    })
  }
  handleOnMenu = (event) =>{
    this.setState({
      onMenu:event.target.value
    })
  }

  storeItem = () => {
    let data = new FormData();
    this.setState({
      newItem: {
        name: this.state.name,
        type: this.state.type,
        ingredient: this.state.ingredient,
        description: this.state.description,
        pairings: this.state.pairings,
        price: this.state.price,
        onMenu: this.state.onMenu
      }
    })
    data.append('newItem', this.state.newItem);

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
    }.bind(this)); console.log(this.state.listItems);
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Database" meta={[ { name: 'description', content: 'Description of Database' }]}/>
        <h1>Database items</h1>

        <div className="formDiv">
            <input type="text" className="name" id="name" placeholder="(Name of dish)" value={this.state.name} onChange={this.handleName} />

          <div className="dropDowns">
            <select className="type" id="type" onChange={this.handleType} >
              <option value="0" defaultValue>Type of dish</option>
            {this.state.types.map((type,index)=>(
              <option value={type.id}>{type.name}</option>
            ))}
            </select>
            <select className="ingredient" id="ingredient" onChange={this.handleIngredient}>
              <option value="0" defaultValue>Main ingredient</option>
              {this.state.ingredients.map((ingredient,index)=>(
                <option value={ingredient.id}>{ingredient.name}</option>
              ))}
            </select>
          </div>

          <textarea className="description" id="description" placeholder="(Description)" value={this.state.description} onChange={this.handleDescription} ></textarea>
          <input type="text" className="pairings" id="pairing" placeholder="(Pairings)" value={this.state.pairings} onChange={this.handlePairings} />

          <div className="alignDiv">
            <input type="text" className="price" id="price" placeholder="(Price)"  value={this.state.price} onChange={this.handlePrice} />
            <div>
              Select for menu<input type="checkbox" className="onMenu" id="onMenu" value={this.state.onMenu} onChange={this.handleOnMenu} />
            </div>
          </div>

          <div className="buttons">
            <input type="submit" className="update" value="Update" onClick="" />
            <input type="submit" className="add" value="Add" onClick={this.storeItem} />
            <input type="submit" className="search" value="Search" onClick="" />
          </div>

        </div>
        <div className="results">
          <h2>Results</h2>
        </div>



      </div>
    );
  }
}

Database.contextTypes = {
  router: React.PropTypes.object
};
