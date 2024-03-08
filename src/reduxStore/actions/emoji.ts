import { SET_EMOJI, UPDATE_EMOJI } from '../constants/emojiDali';

export const setDailiEmoji = (payload: any) => {
	return {
		type: SET_EMOJI,
		payload,
	};
};

export const updateDailiEmoji = (payload: any) => {
	return {
		type: UPDATE_EMOJI,
		payload,
	};
};
