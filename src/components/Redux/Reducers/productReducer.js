import types from "../types";

const INITIAL_STATE = {
    listProductsBestSale: [],
    listProductsByIdCategory: [],
    allCombos: [],
    allProducts: [],
    allProductsBySearchQuery: [],
    productDetail: {},
    comboDetail: {},
    listProductsByIdStore: [],
    ratingProduct: [],
    allDrinks: [],
    productsByCategory: {},
    loading: false,
    error: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_BEST_SALE_SUCCESS:
            return {
                ...state,
                listProductsBestSale: action.dataProducts,
            };
        case types.FETCH_PRODUCT_BY_ID_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FETCH_PRODUCT_BY_ID_CATEGORY_SUCCESS:
            return {
                ...state,
                productsByCategory: {
                    ...state.productsByCategory,
                    [action.categoryId]: action.dataProducts,
                },
                loading: false,
            };
        case types.FETCH_PRODUCT_BY_ID_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case types.FETCH_ALL_COMBO_SUCCESS:
            return {
                ...state,
                allCombos: action.dataCombos,
            };
        case types.FETCH_ALL_PRODUCT_SUCCESS:
            const productsByCategory = action.dataProducts.reduce((acc, product) => {
                const category = product.category.categoryName.toLowerCase();
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(product);
                return acc;
            }, {});
            return {
                ...state,
                allProducts: action.dataProducts,
                productsByCategory,
            };
        case types.FETCH_ALL_DRINK_SUCCESS:
            return {
                ...state,
                allDrinks: action.dataDrinks,
            };
        case types.FETCH_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                productDetail: action.productDetail,
            };
        case types.FETCH_COMBO_BY_ID_SUCCESS:
            return {
                ...state,
                comboDetail: action.comboDetail,
            };
        case types.FETCH_PRODUCT_BY_ID_STORE_SUCCESS:
            return {
                ...state,
                listProductsByIdStore: action.dataProducts,
            };
        case types.FETCH_RATING_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                ratingProduct: action.dataRatingProduct,
            };
        case types.FETCH_PRODUCT_BY_SEARCH_QUERY_SUCCESS:
            return {
                ...state,
                allProductsBySearchQuery: action.dataProducts,
            };
        case types.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                allProductsBySearchQuery: [],
            };
        default:
            return state;

    }
};

export default productReducer;