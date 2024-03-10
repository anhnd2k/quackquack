import { SET_EMOJI } from '../constants/emojiDali';
import { payloadAction, PayLoadEmoji } from '../actions/emoji';

export interface EmojiInitState {
	infoEmoji: PayLoadEmoji[];
}

const initialState: EmojiInitState = {
	infoEmoji: [
		{
			idDay: 1710003600,
			idEmoji: 1,
		},
		{
			idDay: 1709658000,
			idEmoji: 2,
		},
		{
			idDay: 1709917200,
			idEmoji: 3,
		},
		{
			idDay: 1709398800,
			idEmoji: 4,
		},
		{
			idDay: 1707843600,
			idEmoji: 4,
		},
		{
			idDay: 1706806800,
			idEmoji: 4,
		},
		{
			idDay: 1326042000,
			idEmoji: 4,
		},
	],
};

export default function emoji(
	state: EmojiInitState = initialState,
	action: payloadAction
): EmojiInitState {
	switch (action.type) {
		case SET_EMOJI: {
			const listInfoEmoji: PayLoadEmoji[] = state.infoEmoji;
			const idxModify = listInfoEmoji.findIndex((item) => item.idDay === action.payload.idDay);
			if (idxModify !== -1) {
				listInfoEmoji[idxModify] = action.payload;
			} else {
				listInfoEmoji.push(action.payload);
			}
			return {
				...state,
				infoEmoji: listInfoEmoji,
			};
		}
	}
	return state;
}
