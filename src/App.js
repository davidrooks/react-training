import React, { Component } from 'react';
import './App.css';
import arrow from './assets/arrow.svg';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {imageIndex: 0, images: [], hasErrored: false};
  }; 

  nextImage = () => {
    if (this.state.imageIndex < this.state.images.length-1) {
      this.setState({imageIndex: this.state.imageIndex + 1});
    } else {
      this.setState({imageIndex: 0});
    }
  }

  previousImage = () => {
    if (this.state.imageIndex === 0) {
      this.setState({imageIndex: this.state.images.length - 1});
    } else {
      this.setState({imageIndex: this.state.imageIndex - 1});
    }
  }

  componentDidMount() {
    fetch('https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39')
    .then(results => {return results.json()})
    .then(data => {       
      if ('hits' in data && Array.isArray(data.hits)) {  
        // TODO parse each image to check for required fields
        this.setState({images: data.hits});
      } else {
        this.setState({hasErrored: true});
      }
    })
    .catch(error => this.setState({hasErrored: true}));
  }

  render() {
    if (this.state.hasErrored){
      return (
        <div className="App">
          <p>Sorry, there was an error, please try again later.</p>
        </div>
      );
    } else if (this.state.images.length > 0)      
      return (                    
        <div className="ImageCarousel">
          <img src={this.state.images[this.state.imageIndex].webformatURL} alt={this.state.images[this.state.imageIndex].tags} />
          <div className="Navigator">   
            <button onClick={this.previousImage} >
              <img id="previousImage" src={arrow} alt='left arrow'/>
            </button>

            <button onClick={this.nextImage}>
              <img id="nextImage" src={arrow} alt='right arrow'  />
            </button>                     
          </div>
        </div>                  
      );
    else {
      return (
        <div className="App">
          <p>Loading...</p>
        </div>
      );
    }
  }
}

export default App;
