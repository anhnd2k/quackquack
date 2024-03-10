import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import emoji, { EmojiInitState } from './emoji';

export interface ReducerAppState {
	emoji: EmojiInitState;
}

const keyConfig = {
	key: 'rootStorage',
	storage: AsyncStorage,
};

export default combineReducers<ReducerAppState>({
	emoji,
});
