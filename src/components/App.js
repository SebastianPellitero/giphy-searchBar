import React, { Component } from 'react';
import GifsResults from './GifsResults/GifsResults';

//Styles
import './App.css';

/**
* @Class App
* Main class, where everything is conected,
* The title and the GifsResults component are loaded
*/
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1 className="App-title">Gif App</h1>
				<GifsResults />
			</div>
		);
	}
}

export default App;