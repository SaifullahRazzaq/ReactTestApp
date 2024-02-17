import React, {Component} from 'react';
import {
  SIGNUP,
  SIGNOUT,
  SIGNIN,
  NOTIFICATION_READ,
  UPDATE_COUNTER,
  GET_INDICATOR,
} from '../Constants';

export class AuthAction extends Component {
  static Signin(data) {
    return {type: SIGNIN, payload: data};
  }
  static Signup(data) {
    return {type: SIGNUP, payload: data};
  }
  static Signout() {
    return {type: SIGNOUT};
  }
  static ClearRedux() {
    return {type: SIGNOUT};
  }
  static ReaNotification(boole) {
    return {type: NOTIFICATION_READ, payload: boole};
  }
  static UpdateCounter(num) {
    return {type: UPDATE_COUNTER, payload: num};
  }
  static GetIndicator(data) {
    // console.warn(data);
    return {
      type: GET_INDICATOR,
      payload: data,
    };
  }
}

export default AuthAction;
