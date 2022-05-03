import { LOGGED_IN_USER, LOGOUT } from "../types/user.type";

export const login = (data) => {
  return {
    type: LOGGED_IN_USER,
    payload: {
      email: data.email,
      token: data.token,
    },
  };
};

export const logout = (data) => {
  return {
    type: LOGOUT,
    payload: data,
  };
};
