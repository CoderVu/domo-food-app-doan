
import types from "../types";

const INITIAL_STATE = {
    dataCategories: [],
    loading: true,
    error: null,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                dataCategories: action.dataCategories,
                loading: false,
            };
        case types.FETCH_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default categoryReducer;