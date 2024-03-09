import { takeLatest, all } from 'redux-saga/effects';
import { prepaidSubcriberApi } from 'src/services/api/DemoApi';

function* _login(action: any) {
	try {
		const res = yield prepaidSubcriberApi.getListCountry({ username: '' }).loading(true).run();
		// yield put(loginComplete(res));
	} catch (e) {
		// yield put(loginComplete({ success: false }));
	}
}

export function* watchInitial() {
	yield all([takeLatest('LOGIN_ACTION', _login), takeLatest('PROFILE_ACTION', _login)]);
}
