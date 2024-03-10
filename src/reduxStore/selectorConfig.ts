import { createSelector } from 'reselect';
import { ReducerAppState } from './reducers/index';

const getEmoji = (state: ReducerAppState) => state.emoji;

export const getInfoEmoji = createSelector([getEmoji], (emoji) => emoji);
