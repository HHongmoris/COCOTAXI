// reducers.js

import {
  SET_DRIVER_FLAG,
  SET_CLIENT_FLAG,
  SET_DRIVER_ROUTE_FLAG,
  SET_CLIENT_ROUTE_FLAG,
} from "./actions";
const initialState = {
  driver_flag: false,
  client_flag: false,
  driver_route_flag: false,
  client_route_flag: false,
};

const flagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVER_FLAG:
      return {
        ...state,
        driver_flag: action.payload,
      };
    case SET_CLIENT_FLAG:
      return {
        ...state,
        client_flag: action.payload,
      };
    case SET_DRIVER_ROUTE_FLAG:
      return {
        ...state,
        driver_route_flag: action.payload,
      };
    case SET_CLIENT_ROUTE_FLAG:
      return {
        ...state,
        client_route_flag: action.payload,
      };
    default:
      return state;
  }
};

export default flagsReducer;
