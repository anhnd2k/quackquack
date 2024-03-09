import { SET_EMOJI, UPDATE_EMOJI } from '../constants/emojiDali';

export interface PayLoadEmoji {
	idEmoji: number;
	day: number;
}

export interface payloadAction {
	type: string;
	payload: PayLoadEmoji;
}

export const setDailiEmoji = (payload: PayLoadEmoji) => {
	return {
		type: SET_EMOJI,
		payload,
	};
};

export const updateDailiEmoji = (payload: PayLoadEmoji) => {
	return {
		type: UPDATE_EMOJI,
		payload,
	};
};
