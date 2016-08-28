import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';

import ArtworkListItemComponent from '../components/artwork/ArtworkListItemComponent';
import BrowseSubMenuComponent from '../components/common/BrowseSubMenuComponent';
import LoadingIndicatorComponent from '../components/common/LoadingIndicatorComponent';

import { getArtworkList } from '../reducers/artwork/index';
import { getCurrentArtwork } from '../reducers/frame/index';

const masonryOptions = {
    transitionDuration: '0.2s'
};

class StreamContainer extends Component {
  componentWillMount() {
    const {actions} = this.props;
    actions.fetchStreamRequest();
  }

  componentWillUnmount() {
      // this.masonry.off('layoutComplete', () => console.log('masonry'));
  }

  render() {
    const {artworkList, auth, actions, isFirstLoad, location, currentArtwork } = this.props;
    return (
      <div className="container">
        <BrowseSubMenuComponent />
        {
          isFirstLoad
          ? <LoadingIndicatorComponent />
          : (<div className="row">
                <Masonry
                  options={masonryOptions}>
                {
                  artworkList.map(artwork => {
                    return (
                      <ArtworkListItemComponent
                        isAuthenticated={auth.isAuthenticated}
                        key={artwork.id}
                        artwork={artwork}
                        currentArtwork={currentArtwork}
                        location={location}
                        pushArtwork={actions.pushArtwork}
                        likeArtwork={actions.likeArtwork}
                        unlikeArtwork={actions.unlikeArtwork} />
                    )
                  })
                }
                </Masonry>
              </div>)
        }
      </div>
    );
  }
}

StreamContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    artworkList: getArtworkList(state.artwork.streamIds, state.artwork.byId),
    auth: state.auth,
    isFetching: state.artwork.isFetching,
    currentArtwork: getCurrentArtwork(state.frames),
    isFirstLoad: state.artwork.isFirstLoad
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchStreamRequest: require('../actions/artwork/fetchStreamRequest.js'),
    pushArtwork: require('../actions/artwork/pushArtwork.js'),
    likeArtwork: require('../actions/artwork/likeArtworkRequest.js'),
    unlikeArtwork: require('../actions/artwork/unlikeArtworkRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamContainer);
