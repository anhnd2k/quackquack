import { SET_EMOJI } from '../constants/emojiDali';
import { payloadAction, PayLoadEmoji } from '../actions/emoji';

interface InitialState {
	infoEmoji: PayLoadEmoji;
}

const initialState: InitialState = {
	infoEmoji: undefined,
};

export default function emoji(state = initialState, action: payloadAction) {
	switch (action.type) {
		case SET_EMOJI:
			return {
				...state,
				infoEmoji: action.payload,
			};
	}
	return state;
}
