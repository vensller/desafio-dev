export function signInRequest(user, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      user,
      password,
    },
  };
}

export function signUpRequest(user, name, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      user,
      name,
      password,
    },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
