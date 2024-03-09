import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import emoji from './emoji';

const keyConfig = {
	key: 'rootStorage',
	storage: AsyncStorage,
};

export default combineReducers({
	emoji,
});
