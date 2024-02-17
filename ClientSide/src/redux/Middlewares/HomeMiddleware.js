import { Component } from 'react';
import Toast from 'react-native-toast-message';
import { APIs, ApiCaller } from '../../config';
import { ToastError, ToastSuccess } from '../../config/Constants';
import { LoaderAction } from '../Actions';

export class HomeMiddleware extends Component {
    static GetProducts({ pageNumber, pageSize, searchTerm, productType, token, loading, subCategories, userId, sizeId, sortOrder, minPrice, maxPrice }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    searchTerm: searchTerm,
                    userId: userId ?? null,
                    sizeId: sizeId ?? null,
                    subCategories: subCategories ?? [],
                    productType: productType ?? null,
                    sortOrder: sortOrder ?? null,
                    minPrice: minPrice ?? null,
                    maxPrice: maxPrice ?? null
                }
                console.log("payload===>", payload)
                try {
                    loading && dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.GetProducts, payload, BearerHeaders);
                    console.log('response productAPi', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
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
    static getCategoriesList({ token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    // dispatch(LoaderAction.LoaderTrue());
                    const response = await ApiCaller.Get(APIs.GetCategoryList, BearerHeaders);
                    console.log('response getCategoriesList', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        // dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
                    } else {
                        reject(false);
                        // dispatch(LoaderAction.LoaderFalse());
                        Toast.show(ToastError(response.data.message));
                    }
                } catch (error) {
                    reject(false)
                    // dispatch(LoaderAction.LoaderFalse());
                    Toast.show(ToastError(error.message));
                }
            });
        };
    }
    static getCategoriesListWithSubCat({ token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    dispatch(LoaderAction.LoaderTrue());
                    const response = await ApiCaller.Get(APIs.GetCategpryWithSubCategories, BearerHeaders);
                    console.log('response getCategoriesListWithSubCat', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
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
    static AddWishList({ userId, productId, action, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    userId: userId,
                    productId: productId,
                    action: action
                }
                console.log("payload===>", payload)
                try {
                    // dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.AddOrRemove, payload, BearerHeaders);
                    console.log('response AddWishList', response);
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
    static getWishlistByUserId({ pageNumber, pageSize, searchTerm, userId, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    searchTerm: searchTerm,
                    userId: userId,
                }
                console.log("payload===>", payload)
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.GetWishList, payload, BearerHeaders);
                    console.log('response getWishlistByUserId', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
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
    static ContactUs({ name, email, message, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    name: name,
                    email: email,
                    message: message,

                }
                console.log("payload===>", payload)
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.ContactUs, payload, BearerHeaders);
                    console.log('response ContactUs', response);
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
    static GetUserAddressById({ userId, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {

                    dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Get(`${APIs.GetAddress}/${userId}`, BearerHeaders);
                    console.log('response GetUserAddressById', response);
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

    static getOrderBystatus({ pageNumber, pageSize, searchTerm, userId, fromDate, toDate, type, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    searchTerm: searchTerm,
                    fromDate: fromDate,
                    toDate: toDate,
                    userId: userId,
                    type: type,

                }
                console.log("payload===>", payload)
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.getOrders, payload, BearerHeaders);
                    console.log('response getOrderBystatus', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
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
    static GetProductsDetails({ identifier, color, sizeId, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    identifier: identifier,
                    color: color,
                    sizeId: sizeId,

                }
                console.log("payload===>", payload)
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.GetProductDetails, payload, BearerHeaders);
                    console.log('response GetProductsDetails', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
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
    static getProductsColorList({ identifier, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    // dispatch(LoaderAction.LoaderTrue());
                    const response = await ApiCaller.Get(`${APIs.GetProductsColors}/${identifier}`, BearerHeaders);
                    console.log('response getProductsColorList', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        // dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
                    } else {
                        reject(false);
                        // dispatch(LoaderAction.LoaderFalse());
                        Toast.show(ToastError(response.data.message));
                    }
                } catch (error) {
                    reject(false)
                    // dispatch(LoaderAction.LoaderFalse());
                    Toast.show(ToastError(error.message));
                }
            });
        };
    }
    static getProductSizeList({ identifier, color, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                try {
                    let payload = {
                        identifier: identifier,
                        color: color
                    }
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    // dispatch(LoaderAction.LoaderTrue());
                    const response = await ApiCaller.Post(APIs.GetProductsSize, payload, BearerHeaders);
                    console.log('response getProductSizeList', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        // dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
                    } else {
                        reject(false);
                        // dispatch(LoaderAction.LoaderFalse());
                        Toast.show(ToastError(response.data.message));
                    }
                } catch (error) {
                    reject(false)
                    // dispatch(LoaderAction.LoaderFalse());
                    Toast.show(ToastError(error.message));
                }
            });
        };
    }
    static GetReviewList({ pageNumber, pageSize, searchTerm, identifier, token }) {
        return dispatch => {
            return new Promise(async (resolve, reject) => {
                let payload = {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    searchTerm: searchTerm,
                    identifier: identifier,
                }
                console.log("payload===>", payload)
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const BearerHeaders = ApiCaller.BearerHeaders(token)
                    const response = await ApiCaller.Post(APIs.GetReviewsListPage, payload, BearerHeaders);
                    console.log('response GetReviewList', response);
                    if (response.data.statusCode === 200) {
                        resolve(response.data.data);
                        dispatch(LoaderAction.LoaderFalse());
                        // Toast.show(ToastSuccess(response.data.message));
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
