import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services//history';
import api from '../../../services//api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { user: userField, password } = payload;

    const response = yield call(api.post, '/sessions', {
      user: userField,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/operations');
  } catch (error) {
    toast.error('Unable to authenticate');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, user, password } = payload;
    yield call(api.post, 'users', {
      name,
      user,
      password
    });
    toast.success('Account created');
    history.push('/');
  } catch (error) {
    toast.error('Unable to register');

    // yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
