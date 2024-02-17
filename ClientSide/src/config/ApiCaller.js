import Axios from 'axios';
import { ToastError } from './ToastMessage';
import { Store } from '../redux';
import { AuthAction } from '../redux/Actions';
export var baseUrl = 'http://localhost:3010/api/v1';

const CancelToken = Axios.CancelToken.source();
// create the source

Axios.interceptors.response.use(
    response => {
        return response;
    },
    async ({ response, ...rest }) => {
        if (response?.status == 401) {
            try {
                // let {
                //   AuthReducer: {
                //     user: {refreshToken},
                //   },
                // } = Store.getState();
                //  console.warn("401 UnAuthenticated")
                // Axios.CancelToken();

                Store.dispatch(AuthAction.ClearRedux());
                // CancelToken.cancel('Network error');
                console.log('Session Expired!', response);
                ToastError('Session Expired! Please login.')
                // NavigationService.resetStack('AuthStack');
                // });
            } catch (err) {
                console.log('Error= ===', err);
                // Toast.show(ToastError('Network error, please try again.'));
            }
        } else if (response.status == 0) {
            // console.log('response', response);
            return { ...response, data: { message: response?._response } };
        }
        return response;
    },
);

// Axios.interceptors.request.use(
//   function (config) {
//     console.log('internet', config);
//     // if (!internet) {
//     //   Toast.show(ToastError('Network error, please try again.'));
//     //   controller.abort;
//     //   // return null;
//     // }
//     // unsubscribe();
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );
export default class ApiCaller {
    static getQueryStringOfObject = (obj, prefix) => {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p,
                    v = obj[p];
                str.push(
                    v !== null && typeof v === 'object'
                        ? this.getQueryStringOfObject(v, k)
                        : encodeURIComponent(k) + '=' + encodeURIComponent(v),
                );
            }
        }
        return str.join('&');
    };

    static BearerHeaders = (token: any, More: AxiosRequestConfig = {}) => {
        return {
            Authorization: 'Bearer ' + token,
            ...More,
        };
    };

    static Get = (url = '', headers = {}, customUrl = '') => {
        this.source = CancelToken;
        console.log(
            'API CALL===>>> GET',
            customUrl ? customUrl : `${baseUrl}${url}`,
        );

        return Axios.get(customUrl ? customUrl : `${baseUrl}${url}`, {
            timeout: 20000,
            cancelToken: this.source.token,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                ...headers,
            },
        })
            .then(res => res)
            .catch(err => err.response);
    };

    static Post = async (
        endPoint = '',
        body = {},
        headers = {},
        cutomUrl = '',
        onUploadProgress = () => { },
    ) => {
        console.log('API CALL===>>> POST', endPoint, body, headers);
        return Axios.post(cutomUrl ? cutomUrl : `${baseUrl}${endPoint}`, body, {
            timeout: 20000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers,
            },
            onUploadProgress: progress => onUploadProgress(progress),
        });
    };

    static Put = (url = '', body = {}, headers = {}) => {
        return Axios.put(`${baseUrl}${url}`, body, {
            headers: { 'Content-Type': 'application/json', ...headers },
        })
            .then(res => res)
            .catch(err => err.response);
    };

    static Delete = (url = '', body = {}, headers = {}) => {
        return Axios.delete(`${baseUrl}${url}`, {
            headers: { 'Content-Type': 'application/json', ...headers },
            data: body,
        })
            .then(res => res)
            .catch(err => err.response);
    };
}