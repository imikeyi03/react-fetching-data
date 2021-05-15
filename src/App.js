import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    }
  } 


componentDidMount() {
 this.performSearch();
}

performSearch = (query = "awesome") => {
  // Search Giphy API Endpoint
  axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
  .then(response => {
    this.setState({
      gifs: response.data.data,
      loading: false 
    })
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });
}



  render() { 
    console.log(this.state.gifs)
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>  
        <div className="main-content">
        <p>A giphy API search by <b>Mikey Mann</b></p>
        {
          // Ternary if else clause

          // If state 'loading' is true,
          (this.state.loading)
          // Display Loading
            ?<p>Loading...</p>
            // Else, load the GifList component with the data fetched in axios
            :<GifList data={this.state.gifs} />
        }
          
        </div>
      </div>
    );
  }
}
