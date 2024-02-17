import { Component } from 'react';
import Toast from 'react-native-toast-message';
import { APIs, ApiCaller } from '../../config';
import { ToastError, ToastSuccess } from '../../config/Constants';
import { AuthAction, LoaderAction } from '../Actions';

export class AuthMiddleware extends Component {
  static registerUser({ firstName, lastName, phone, email, password, profilePictureFileName }) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let payload = {
            emailAddress: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            // phone: phone,
            profilePictureFileName: profilePictureFileName
          }
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(APIs.Signup,
            payload,
          );
          console.log('response', response);
          if (response.data.statusCode === 200) {
            resolve(response.data.data);
            dispatch(LoaderAction.LoaderFalse());
            Toast.show(ToastSuccess(response.data.message));
          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
            Toast.show(ToastError(response.data.message));
          }
        } catch (error) {
          reject(false)
          dispatch(LoaderAction.LoaderFalse());
          Toast.show(ToastError(error.message));
        }
      });
    };
  }
}
