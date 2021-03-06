import { success, error } from 'redux-saga-requests';
import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    SIGN_OUT,
    GET_AUTH_USER,
    UPDATE_USER
} from './actions';
import { STATE_STATUSES } from "../../utils/stateStatuses";
import { axiosController } from "../../utils/axiosController";

const initialState = {
    user: {},
    isAuthenticated: false,
    status: STATE_STATUSES.INIT,
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
        case UPDATE_USER:
        case GET_AUTH_USER:
        case AUTH_REGISTER: {
            return processReducer(state);
        }

        case success(AUTH_LOGIN): {
            axiosController.saveToken(action.data.data.token);
            return {
                ...state,
                status:STATE_STATUSES.SUCCESS,
                isAuthenticated: true,
                user: action.data.data.user
            };
        }

        case success(AUTH_REGISTER): {
            return {
                ...state,
                status: STATE_STATUSES.SUCCESS,
            };
        }

        case success(UPDATE_USER): {
            return {
                ...state,
                user: action.data.data,
                status: STATE_STATUSES.SUCCESS,
            };
        }

        case success(GET_AUTH_USER): {
            return {
                ...state,
                user: action.data.data,
                isAuthenticated: true,
                status: STATE_STATUSES.SUCCESS,
            };
        }

        case error(UPDATE_USER):
        case error(AUTH_REGISTER):
        case error(GET_AUTH_USER):
        case error(AUTH_LOGIN): {
            return errorReducer(action, state);
        }

        case SIGN_OUT: {
            axiosController.deleteToken();
            return {
                ...state,
                user: {},
                isAuthenticated: false
            };
        }

        default:
            return state;
    }
};

const processReducer = (state = initialState) => ({
    ...state,
    status: STATE_STATUSES.PENDING,
    exception: { ...initialState.exception }
});

const errorReducer = (exception, state = initialState) => {
    return ({
        ...state,
        status: STATE_STATUSES.ERROR,
        exception: {
            errors: {...exception.error.response.data.errors},
            message: exception.error.response.data.message
        }
    });
};
