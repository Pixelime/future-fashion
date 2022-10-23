import * as TYPES from './types';

import UserService from "../services/UserService";

export const retrieveUsers = (filters = {}) => async (dispatch) => {
    try {

        dispatch({
            type: TYPES.USERS_LIST_FILTERS,
            payload: filters
        });

        const res = await UserService.getAll(filters);

        dispatch({
            type: TYPES.RETRIEVE_USERS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const retrieveUser = (id) => async (dispatch) => {
    try {
        const res = await UserService.get(id);

        dispatch({
            type: TYPES.RETRIEVE_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const createUser = (data) => async (dispatch) => {
    try {
        const res = await UserService.create(data);

        dispatch({
            type: TYPES.CREATE_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const res = await UserService.update(id, data);

        dispatch({
            type: TYPES.UPDATE_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await UserService.delete(id);

        dispatch({
            type: TYPES.DELETE_USER,
            payload: {id},
        });

        return Promise.resolve(id);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};
