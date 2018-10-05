import React, {Component} from 'react';
import PropTypes from 'prop-types';

//Icons
import heart from '../../icons/fav.svg';
import heartRed from '../../icons/fav-full.svg';

//Styles
import './Gif.css';

/**
* @Class Gif
* Renders the markup for every gif displayed
*/
class Gif extends Component {
	/**
	* @method handleClick
	* When the user clicks on the heart icon, generates an object with the
	* info needed to store it in the favorite list, and sends it up to the GifsResults component
	*/
	handleClick = () => {
		const gifClicked = {
			url: this.props.gifInfo.url,
			images: this.props.gifInfo.images,
			title: this.props.gifInfo.title,
			id: this.props.gifInfo.id,
			isFavorite: false
		}
		this.props.handleClickedGif(gifClicked);
	}

	render() {
		const heartSrc = this.props.gifInfo.isFavorite ? heartRed : heart;
		return (
			<div className="gif-item">
				<a className="gif-item__link" href={this.props.gifInfo.url} rel="noopener noreferrer" target="_blank">
					<img src={this.props.gifInfo.images.fixed_height.url} alt={this.props.gifInfo.title} />
				</a>
				<span className="gif-item__heart">
					<img src={heartSrc} className="fav icon" alt="Add to favourites" onClick={this.handleClick}/>
				</span>
			</div>
		)
	}
}

Gif.PropTypes = {
	 id: PropTypes.number,
	 gifInfo: PropTypes.objectOf({
	 	url: PropTypes.string,
	 	images: PropTypes.string,
	 	title: PropTypes.string,
	 	id: PropTypes.number,
	 	favorite: PropTypes.boolean
	 }),
}

export default Gif;
