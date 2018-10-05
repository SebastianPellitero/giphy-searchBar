import React, { Component } from 'react';
import GifList from '../GifList/GifList';
import Favorite from '../Favorite/Favorite';

//Icons
import searchIcon from '../../icons/magnifying-glass.svg';

/**
* @Class GifsResults
* This class handles the functionality to add, remove and updates gifs
* from both arrays gifs and favList.
* Renders the favorite list, the search input and the trending/results list.
*/
class GifsResults extends Component {
	/**
	* @constructor
	* Note: I tried to use Redux to handle this properties in the store,
	* but as for now is a simple application, I add the list here and the funcionality
	* to updates it also. I consider that redux will be an overkill for now, but
	* will be very useful if the app continues grow.
	*/
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			gifs: [],
			favList: [],
			title: "Top 10 trending GIFs"
		};
	}

	/**
	* @method componentDidMount
	* When the user enters the page will show the results of the API with the 
	* 10 top results, calling the Giphy API
	*/
	componentDidMount() {
		this.fetchResults("trending?", 10)
	}

	/**
	* @method fetchResults
	* Call the API assembling the url with the parameters passed,
	* then saves the response in the gifs array and 
	* calls the updateResultsWithFavorites to keep both arrays updated
	*/
	fetchResults = (type, limit) => {
		let url = `http://api.giphy.com/v1/gifs/${type}api_key=YNUUfVLVQoXlI1cnhA1feS11ksbdCK1k&limit=${limit}`;
		fetch(url)
			.then(response => response.json())
			.then((response) => {
				this.setState({
					gifs: response.data
				});
			})
			.then(() => {
				this.updateResultsWithFavorites();
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
	}

	/**
	* @method onSearchInputChange
	* When the user enters something in the search input, will do the fetch to the
	* API again to display the top 20 results, and updates the title of the module.
	* If the search input is empty, will show the "default", trendring tops results.
	* As the results of both, are continuesly changing, the API is consulted every time.
	*/
	onSearchInputChange = (event) => {
		if (event.target.value !== "" ) {
			this.setState({
				searchTerm: event.target.value,
				title:"Top 20 results GIFs"
			});
			this.fetchResults(`search?q=${this.state.searchTerm}&`, 20);
		} else {
			this.setState({
				searchTerm: "",
				title:"Top 10 trending GIFs"
			});
			this.fetchResults("trending?", 10);
		}
	}

	/**
	* @method updateResultsWithFavorites
	* Check for every item in favorites if they are on the new results
	* that are about to be displayed, setting the isFavorite property to true
	* that will display the red heart icon (This could be added in a new method to reuse in the others
	* functions that uses it)
	*/
	updateResultsWithFavorites = () => {
		let stateGifs = this.state.gifs;
		this.state.favList.forEach(function(fav){
			stateGifs.forEach(function(item){
				if (fav.id === item.id){
					item["isFavorite"] = true;
				}
			});
		});
		this.setState({
			gifs: stateGifs
		});
	}

	/**
	* @method handleClickedGif
	* Get the info of the clicked gif and check if it's already in the favorite list.
	* If it is, it will call the method to remove it, and if not, it will add it
	*/
	handleClickedGif = (gifClicked) => {
		const indexFav = this.state.favList.findIndex(gif => gifClicked.id === gif.id);
		indexFav >= 0 ? this.removeGifFromFavorites(indexFav, gifClicked.id) : this.addGifToFavorite(gifClicked);
	}

	/**
	* @method addGifToFavorite
	* Receives the information of the gif and adds it to the favorite list.
	* Also checks if this gif is among the results displayed and updates the
	* state of the heart icon (This could be added in a new method to reuse in the others
	* functions that uses it)
	*/
	addGifToFavorite = (gif) => {
		gif.isFavorite = true;
		let stateGifs = this.state.gifs;
		stateGifs.forEach(function(item){
			if (gif.id === item.id){
				item["isFavorite"] = true;
			}
		});
		this.setState({
			favList: [...this.state.favList, gif],
			gifs: stateGifs
		});
	}

	/**
	* @method removeGifFromFavorites
	* Receives the id of the gif and the index in wich this gif is in the favorite
	* list, and removes it from there.
	* Also checks if this gif is among the results displayed and updates the
	* state of the heart icon (This could be added in a new method to reuse in the others
	* functions that uses it)
	*/
	removeGifFromFavorites = (indexFav, gifId) => {
		let stateGifs = this.state.gifs;
		stateGifs.forEach(function(item){
			if (gifId === item.id){
				item["isFavorite"] = false;
			}
		});
		this.setState({
			favList: [
					...this.state.favList.slice(0, indexFav),
					...this.state.favList.slice(indexFav + 1)
				],
			gifs: stateGifs
		});
	}

	render() {
		return (
			<div>
				<Favorite
					favList={this.state.favList}
					handleClickedGif={this.handleClickedGif} />
				<div className="search-container">
					<img src={searchIcon} alt="Search icon" className="search-icon icon" />
					<input
						type = "text"
						onChange = {this.onSearchInputChange}
						id = "search"
						placeholder = "Search" />
				</div>
				<h1>{this.state.title}</h1>
				<GifList
					results={this.state.gifs}
					handleClickedGif={this.handleClickedGif} />
			</div>
		);
	}
}

export default GifsResults;