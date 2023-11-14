export const CLIENT_LATITUDE = 'CLIENT_LATITUDE';
export const CLIENT_LONGITUDE = 'CLIENT_LONGITUDE';
export const IS_CLIENT_CHANGED = 'IS_CLIENT_CHANGED';
export const DRIVER_LATITUDE = 'DRIVER_LATITUDE';
export const DRIVER_LONGITUDE = 'DRIVER_LONGITUDE';
export const IS_DRIVER_CHANGED = 'IS_DRIVER_CHANGED';
export const SET_CALL_ID = 'SET_CALL_ID';
export const SET_DRIVER_ID = 'SET_DRIVER_ID';
export const SET_DRIVER_BOUNDARY = 'SET_DRIVER_BOUNDARY';

// 승객 변경시 -> driver, clientLocation 둘다 받아야 한다
// driverflag, clientflag 둘다 false로 처리한다
// driver,client 둘다 새로운 주소값을 받아야 한다

export const setClientLatitude = (location) => { // 승객 변경시
  return {
    type : CLIENT_LATITUDE,
    payload : location,
  }
};
export const setClientLongitude = (longitude) => {
  return {
    type : CLIENT_LONGITUDE,
    payload : longitude,
  }
}

export const isClientChanged = (flag) => {
  return {
    type : IS_CLIENT_CHANGED,
    payload : flag,
  }
};

// 차량 변경시 -> 차량만 주소를 새로 받으면 된다
// clientflag는 true로 두면서 driverflag를 false처리한다
// driver 주소 값만 새로 받으면 된다.

export const setDriverLatitude = (latitude) => {
  return {
    type : DRIVER_LATITUDE,
    payload : latitude,
  }
};
export const setDriverLongitude = (longitude) => {
  return {
    type : DRIVER_LONGITUDE,
    payload : longitude,
  }
};
export const isDriverChanged = (flag) => {
  return {
    type : IS_DRIVER_CHANGED,
    payload : flag,
  }
}

export const setCallId = (id) => {
  return {
    type : SET_CALL_ID,
    payload : id,
  }
}

export const setDriverId = (id) => {
  return {
    type : SET_DRIVER_ID,
    payload : id,
  }
}
