// reducers.js

import {
  CLIENT_LOCATION,
  IS_CLIENT_CHANGED,
  DRIVER_LOCATION,
  IS_DRIVER_CHANGED
} from "./actions";
const initialState = {
  driver_location: "",
  client_location: "35.098,128.548",
  is_client_location_changed: false,
  is_driver_location_changed: false,
};

const flagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_LOCATION:
      return {
        ...state,
        client_location: action.payload,
      };
    case DRIVER_LOCATION:
      return {
        ...state,
        driver_location: action.payload,
      };
    case IS_CLIENT_CHANGED:
      return {
        ...state,
        is_client_location_changed: action.payload,
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
