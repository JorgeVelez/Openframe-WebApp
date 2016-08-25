/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { combineReducers } from 'redux';

import { getById } from '../index';
import byId from './byId';
import ids from './ids';
import selectedFrameId from './selectedFrameId';
import { isFetching, lastUpdated } from './meta';

export default combineReducers({
  byId,
  ids,
  selectedFrameId,
  isFetching,
  lastUpdated
});

/**
 * Ger an array of frame objects.
 * @param  {Array} frameIds
 * @param  {String} framesById
 * @return {Array}
 */
export const getFramesList = function(frameIds, framesById) {
  return frameIds.map(id => getById(framesById, id));
}

/**
 * Selector which returns the selected frame model
 * @param  {Array} frames
 * @param  {String} selectedFrameId
 * @return {Object}
 */
export const getSelectedFrame = function(framesById, selectedFrameId) {
  let selectedFrame = null;
  return getById(framesById, selectedFrameId);
}