// actions.js

export const SET_DRIVER_FLAG = 'SET_DRIVER_FLAG';
export const SET_CLIENT_FLAG = 'SET_CLIENT_FLAG';
export const SET_DRIVER_ROUTE_FLAG = 'SET_DRIVER_ROUTE_FLAG';
export const SET_CLIENT_ROUTE_FLAG = 'SET_CLIENT_ROUTE_FLAG';

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

export const setDriverRouteFlag = (flag) => {
  return {
    type: SET_DRIVER_ROUTE_FLAG,
    payload: flag,
  };
};

export const setClientRouteFlag = (flag) => {
  return {
    type: SET_CLIENT_ROUTE_FLAG,
    payload: flag,
  };
};
