'use strict';

import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router'

import PushButtonComponent from '../common/PushButtonComponent';

require('styles/artwork/ArtworkListItem.scss');
// let settingsBtnImage = require('../../images/artwork-settings.svg');

// TODO: move calculated properties out of here... should all happen via normalizr & reselect

class ArtworkListItemComponent extends Component {

  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }

  _formatDisplayName(format) {
    switch (format) {
        case 'openframe-glslviewer':
            return 'shader';
        default:
            return format.replace('openframe-', '');
    }
  }

  _handlePushClick(e) {
    e.preventDefault();
    let {artwork, pushArtwork} = this.props;
    pushArtwork(artwork.id);
  }

  render() {
    let { artwork, isAuthenticated } = this.props;

    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <Link to={{
              pathname: '/artwork/'+artwork.id,
              state: { modal: true, returnTo: this.props.location.pathname }
            }}>
            <div className="artwork-list-item" onMouseOver={::this.toggleHover} onMouseOut={::this.toggleHover}>
              <div className="artwork-list-item__thumb">
                <img className="artwork-list-item__thumb-img" src={artwork.thumb_url} />
              </div>
              <div className="artwork-list-item__info">
                <div className="artwork-list-item__author">{artwork.author_name}</div>
                <div className="artwork-list-item__title">{artwork.title}</div>
                <div className="artwork-list-item__format">{this._formatDisplayName(artwork.format)}</div>
              </div>
              { isAuthenticated
                ? <div className="artwork-list-item__actions">
                    <div className="artwork-list-item__push" title="Push to frame">
                      <PushButtonComponent handleClick={::this._handlePushClick} show={this.state.hover} />
                    </div>
                    <div className="artwork-list-item__like">
                    </div>
                  </div>
                : null
              }
            </div>
          </Link>
        </div>
    );
  }
}

ArtworkListItemComponent.displayName = 'ArtworkListItemComponent';

// Uncomment properties you need
ArtworkListItemComponent.propTypes = {
  artwork: PropTypes.object.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  pushArtwork: PropTypes.func.isRequired
};

ArtworkListItemComponent.defaultProps = {
};

export default ArtworkListItemComponent;