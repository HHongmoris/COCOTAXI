// reducers.js

import { SET_DRIVER_FLAG,
    SET_CLIENT_FLAG,
    CLIENT_LOCATION,
    IS_CLIENT_CHANGED,
    DRIVER_LOCATION,
    IS_DRIVER_CHANGED,
  } from './actions';

const initialState = {
  driver_flag: false,
  client_flag: false,
  client_location : "",
  is_client_changed : false,
  driver_location : "",
  is_driver_changed : false,
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
    case CLIENT_LOCATION:
      return {
        ...state,
        client_location : action.payload,
      }
    case IS_CLIENT_CHANGED:
      return {
        ...state,
        is_client_changed : action.payload,
      }
      case DRIVER_LOCATION:
      return {
        ...state,
        driver_location : action.payload,
      }
    case IS_DRIVER_CHANGED:
      return {
        ...state,
        is_driver_changed : action.payload,
      }
    
    default:
      return state;
  }
};

export default flagsReducer;