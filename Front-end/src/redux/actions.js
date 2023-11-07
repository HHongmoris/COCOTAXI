// actions.js

export const SET_DRIVER_FLAG = 'SET_DRIVER_FLAG';
export const SET_CLIENT_FLAG = 'SET_CLIENT_FLAG';
export const CLIENT_LOCATION = 'CLIENT_LOCATION';
export const IS_CLIENT_CHANGED = 'IS_CLIENT_CHANGED';
export const DRIVER_LOCATION = 'DRIVER_LOCATION';
export const IS_DRIVER_CHANGED = 'IS_DRIVER_CHANGED';

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

// 승객 변경시 -> driver, clientLocation 둘다 받아야 한다
// driverflag, clientflag 둘다 false로 처리한다
// driver,client 둘다 새로운 주소값을 받아야 한다

export const setClientLocation = (location) => { // 승객 변경시
  return {
    type : CLIENT_LOCATION,
    payload : location,
  }
};
export const isClientChanged = (flag) => {
  return {
    type : IS_CLIENT_CHANGED,
    payload : flag,
  }
};

// 차량 변경시 -> 차량만 주소를 새로 받으면 된다
// clientflag는 true로 두면서 driverflag를 false처리한다
// driver 주소 값만 새로 받으면 된다.

export const setDriverLocation = (location) => {
  return {
    type : DRIVER_LOCATION,
    payload : location,
  }
};
export const isDriverChanged = (data) => {
  return {
    type : IS_DRIVER_CHANGED,
    payload : data,
  }
}