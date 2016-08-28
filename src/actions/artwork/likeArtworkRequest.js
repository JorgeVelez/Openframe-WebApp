import {LIKE_ARTWORK_REQUEST} from './../const';
import likeArtworkSuccess from './likeArtworkSuccess';
import likeArtworkFailure from './likeArtworkFailure';
import { users } from '../../sources/api';

module.exports = function(artworkId) {
  return (dispatch) => {
    dispatch({
      type: LIKE_ARTWORK_REQUEST
    });

    users.likeArtwork(artworkId).then(
      response => dispatch(likeArtworkSuccess(response)),
      error => {
        dispatch(likeArtworkFailure(error))
      }
    );
  };
};
