import React, {Component} from 'react';
import Gif from '../Gif/Gif';

//Styles
import './GifList.css';

/**
* @Class GifList
* Renders the markup for the container of the list of gifs
*/
class GifList extends Component {
	render() {
		return (
			<div className="gif-list-content">
				{this.props.results.map( currentGif => (
					<Gif
						gifInfo={currentGif}
						key={currentGif.id}
						handleClickedGif={this.props.handleClickedGif} />
				))}
			</div>
		)	
	}
}

export default GifList;