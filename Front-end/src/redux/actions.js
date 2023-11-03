// actions.js

export const SET_DRIVER_FLAG = 'SET_DRIVER_FLAG';
export const SET_CLIENT_FLAG = 'SET_CLIENT_FLAG';

export const setDriverFlag = (flag) => {
  return {
    type: SET_DRIVER_FLAG,
    payload: flag,
  };
};

export const setClientFlag = (flag) => {
  return {
    type: SET_CLIENT_FLAG,
    payload: flag,
  };
};
