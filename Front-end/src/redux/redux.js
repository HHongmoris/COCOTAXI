// reducers.js

import {
  CLIENT_LATITUDE,
  CLIENT_LONGITUDE,
  DRIVER_LATITUDE,
  DRIVER_LONGITUDE,
  IS_CLIENT_CHANGED,
  IS_DRIVER_CHANGED,
} from "./actions";
const initialState = {
  driver_latitude: 0.0,
  driver_longitude: 0.0,
  client_latitude: 17.96894,
  client_longitude: 102.61451,
  is_client_location_changed: false,
  is_driver_location_changed: false,
};

const flagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_LATITUDE:
      return {
        ...state,
        client_latitude: action.payload,
      };
      case CLIENT_LONGITUDE:
      return {
        ...state,
        client_longitude: action.payload,
      };
    case IS_CLIENT_CHANGED:
    return {
      ...state,
      is_client_location_changed: action.payload,
    };
    case DRIVER_LATITUDE:
      return {
        ...state,
        driver_latitude: action.payload,
      };
      case DRIVER_LONGITUDE:
        return {
          ...state,
          driver_longitude: action.payload,
        };
    case IS_DRIVER_CHANGED:
      return {
        ...state,
        is_driver_location_changed: action.payload,
      };

    default:
      return state;
  }
};

export default flagsReducer;
