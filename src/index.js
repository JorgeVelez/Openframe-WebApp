import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import StreamContainer from './containers/StreamContainer';
import CollectionsContainer from './containers/CollectionsContainer';
import ChannelsContainer from './containers/ChannelsContainer';
import ArtworkDetailContainer from './containers/ArtworkDetailContainer';
import CollectionDetailContainer from './containers/CollectionDetailContainer';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

// test data
const initialState = require('../test/fixture.js');

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/stream" />
        <Route path="stream" component={StreamContainer} />
        <Route path="collections" component={CollectionsContainer} />
        <Route path="channels" component={ChannelsContainer} />

        <Route path="artwork/:artworkId" component={ArtworkDetailContainer} />
        <Route path="collections/:collectionId" component={CollectionDetailContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);