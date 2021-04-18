import jwt from 'jwt-decode';

export const cognitoLogin = `https://echoauth.auth.us-east-1.amazoncognito.com/login?client_id=2njfth8st77u6ku1v10gb3318n&response_type=token&scope=email+profile+openid&redirect_uri=https://main.d18d22pkhjatt9.amplifyapp.com/dashboard`;

export const pullUrlParams = dispatch => {
    const searchStr = window.location.hash;
    const urlParams = new URLSearchParams(searchStr);
    const idToken = urlParams.get('#id_token');
    const accessToken = urlParams.get('#access_token');
    var jwtToken = (idToken != null) ? idToken : accessToken;

    if (jwtToken != null && jwtToken != "") {
        storeLogin(dispatch, jwtToken);
    }
}

export const storeLogin = (dispatch, jwtToken) => {
  const user = jwt(jwtToken)
  localStorage.setItem('jwt', jwtToken);

  dispatch({
    type: "SET_USER",
    payload: user
  });
};

export const logout = dispatch => {
  localStorage.removeItem("jwt")
  dispatch({
    type: "SET_USER",
    payload: {}
  })
}

export const checkLogin = dispatch => {
  let token = localStorage.getItem("jwt");

  if (token !== null) {
    const user = jwt(token);
    dispatch({
      type: "SET_USER",
      payload: user
    });
  } else {
      pullUrlParams(dispatch)
  }
}

export const getToken = () => {
  return localStorage.getItem("jwt");
}

export const isLoggedIn = (authState) => {
  return Object.keys(authState.user).length > 0
}
