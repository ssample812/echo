import React, { useReducer, useContext } from 'react';

import { AuthContext } from './AuthContext'
import AuthReducer from './AuthReducer'

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch]
}

export const AuthState = (props) => {
  const initialState = {
    user: {},
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state: state,
        dispatch
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
