import React, {Component} from 'react';
import GifList from '../GifList/GifList';

//Styles
import './Favorite.css';

/**
* @Class Favorite
* Renders the markup for the favorite list
*/
class Favorite extends Component {
	render() {
		return (
			<div className="fav-container">
				{this.props.favList.length > 0 ? (
					<div>
						<p>This are your favorites!</p>
						<GifList
							results={this.props.favList}
							handleClickedGif={this.props.handleClickedGif} />
					</div>
				) : (
					<p> You don't have any favorites, try add some :)</p>
				)}
			</div>
		)	
	}
}

export default Favorite;