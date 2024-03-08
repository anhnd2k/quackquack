import { SET_EMOJI } from '../constants/emojiDali';

const initialState = {
	loginResponse: undefined, // đăng nhập
	captchaResponse: undefined, // lấy captcha
	profileResponse: undefined, // lấy thông tin tài khoản
};

export default function emoji(state = initialState, action: any) {
	switch (action.type) {
		case SET_EMOJI:
			return {
				...initialState,
			};
	}
	return state;
}
