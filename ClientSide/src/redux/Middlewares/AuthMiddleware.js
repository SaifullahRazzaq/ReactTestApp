import { Component } from 'react';
import ApiCaller from '../../config/ApiCaller';
import { ToastSuccess, ToastError } from '../../config/ToastMessage';
import { LoaderAction } from '../Actions';
import API from '../../config/API';

export class AuthMiddleware extends Component {
  static registerUser({ Username, email, password, profilePictureFileName }) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let payload = {
            firstName: Username,
            emailAddress: email,
            password: password,
            profilePictureFileName: profilePictureFileName
          }
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(API.Signup,
            payload,
          );
          console.log('response', response);
          if (response.data.statusCode === 200) {
            resolve(response.data.data);
            dispatch(LoaderAction.LoaderFalse());
            ToastSuccess(response.data?.message)
          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
            ToastError(response.data.message)
          }
        } catch (error) {
          reject(false)
          dispatch(LoaderAction.LoaderFalse());
          ToastError(error.message)
        }
      });
    };
  }
}
