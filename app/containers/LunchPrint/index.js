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
     return today;
   };

   componentWillMount(){
     this.getSoups();
     this.getAppetizers();
     this.getEntrees();
     this.getDesserts();
   };

   getSoups = () => {
     fetch('http://localhost:8000/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 1, {
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
     fetch('http://localhost:8000/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 2, {
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
     fetch('http://localhost:8000/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 3, {
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
     fetch('http://localhost:8000/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 4, {
       method: 'get'
     })
     .then(function(response){
       return response.json();
     })
     .then(function(json){
       this.setState({
         desserts:json.menuSpecials
       })
     }.bind(this));
   };

   getBeers = () => {
     fetch('http://localhost:8000/api/getMenuSpecials?onMenuID=' + 1 + '&type=' + 5, {
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


   render() {
     return (
       <div className="container">
         <CheckToken />
         <Helmet title="LunchPrint" meta={[ { name: 'description', content: 'Description of LunchPrint' }]}/>

         <div className="outLine">
           <h1>Evening Extras</h1>
           <div className="specials">
             <div className="firsts">
               {this.state.soups.map((soup, index) => (
                 <div className="specialItem">
                 <h2>Soups of the Day: Our Famous Potato or {soup.name}</h2>
                 </div>
                 ))}
               <h2>* Appetizers *</h2>
               {this.state.appetizers.map((appetizer, index) => (
                 <div className="specialItem">
                 <h3>{appetizer.name} ... {appetizer.price}</h3>
                 <h4>{appetizer.description}</h4>
                 </div>
                 ))}
             </div>

               <div className="entrees">
                 <h2>* Entrees *</h2>
                 {this.state.entrees.map((entree, index) => (
                 <div className="specialItem">
                 <h3>{entree.name} ... {entree.price}</h3>
                 <h4>{entree.description}</h4>
                 </div>
               ))}
                 <p>Entrée specials served with salad or cup of Soup of the Day, and bread, unless otherwise noted. </p>
                 <p>Our fabulous stuffed potato is 1.75 additional charge when available.</p>
               </div>

               <div className="desserts">
                  <h2>* Desserts *</h2>
                  {this.state.desserts.map((dessert, index) => (
                 <div className="specialItem">
                 <h3>{dessert.name} ... {dessert.price}</h3>
                 <h4>{dessert.description}</h4>
                 </div>
               ))}
               </div>

             <div className="libations">
               <h2>Beer News</h2>
               <br/>
               <h3>Samuel Adams Seasonal is ***</h3>
               <h3>Traveling Beer Tap is ***</h3>
             </div>
             <div className="notes">
               <h2></h2>
             </div>
           </div>
           {this.getDate()}
        </div>
     </div>
     );
   }
 }


LunchPrint.contextTypes = {
  router: React.PropTypes.object
};
