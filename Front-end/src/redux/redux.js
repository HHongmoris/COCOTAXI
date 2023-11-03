// reducers.js

import { SET_DRIVER_FLAG, SET_CLIENT_FLAG } from './actions';

const initialState = {
  driver_flag: false,
  client_flag: false,
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
    default:
      return state;
  }
};

export default flagsReducer;