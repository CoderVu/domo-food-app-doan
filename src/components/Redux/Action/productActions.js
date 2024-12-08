import types from "../types";
import {
    fetchProductsByIdCategoryService,
    fetchAllCombosService,
    fetchProductByIdService,
    fetchComboByIdService,
    fetchProductsByIdStoreService,
    fetchAllDrinksService,
    fetchAllProductsService,
    fetchProductsBySearchQueryService

} from "../../Redux/Services/ProductService";
import { fetchUserDetailByIdService } from "../../Redux/Services/UserService";
import { toast } from "react-toastify";


// by idCategory
const fetchProductsByIdCategorySuccess = ({ data, categoryId }) => {
    return {
        type: types.FETCH_PRODUCT_BY_ID_CATEGORY_SUCCESS,
        dataProducts: data,
        categoryId,
    };
};

const fetchProductsByIdCategory = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchProductsByIdCategoryService(id);
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchProductsByIdCategorySuccess({ data, categoryId: id }));
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };
};

// fetch all combos
const fetchAllCombosSuccess = (data) => {
    return {
        type: types.FETCH_ALL_COMBO_SUCCESS,
        dataCombos: data,
    };
};

const fetchAllCombosFailure = (error) => {
    return {
        type: types.FETCH_ALL_COMBO_FAILURE,
        error,
    };
};

const fetchAllCombos = (id) => {
    return async (dispatch) => {
        try {
            const res = await fetchAllCombosService();
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchAllCombosSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchAllCombosFailure(error.message));
        }
    };
};
// fetch all prodcuc
const fetchAllProductsSuccess = (data) => {
    return {
        type: types.FETCH_ALL_PRODUCT_SUCCESS,
        dataProducts: data
    };
};
const fetchAllProducts = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchAllProductsService();
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchAllProductsSuccess(data)); // // Chạy ở đây (2)
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
};

// fetch all combos
const fetchAllDrinksSuccess = (data) => {
    return {
        type: types.FETCH_ALL_DRINK_SUCCESS,
        dataDrinks: data
    };
};
const fetchAllDrinks = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchAllDrinksService();
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchAllDrinksSuccess(data)); // // Chạy ở đây (2)
        } catch (error) {
            console.log(error);
        }
    }
};

// by idProduct => Product Detail
const fetchProductByIdSuccess = (data) => {
    return {
        type: types.FETCH_PRODUCT_BY_ID_SUCCESS,
        productDetail: data,
    };
};
const fetchProductById = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchProductByIdService(id);
            const data = res && res.data ? res.data.data[0] : {};
            dispatch(fetchProductByIdSuccess(data)); 
    
        } catch (error) {
            console.log(error);
        }
    }
};
// by idCombo => Combo Detail
const fetchComboByIdSuccess = (data) => {
    return {
        type: types.FETCH_COMBO_BY_ID_SUCCESS,
        comboDetail: data
    };
};
const fetchComboById = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchComboByIdService(id);
            const data = res && res.data ? res.data.data[0] : {};
            dispatch(fetchComboByIdSuccess(data)); 
    
        } catch (error) {
            console.log(error);
        }
    }
};

// by ID Store
const fetchProductsByIdStoreSuccess = (data) => {
    return {
        type: types.FETCH_PRODUCT_BY_ID_STORE_SUCCESS,
        dataProducts: data
    };
};
const fetchProductsByIdStore = (id) => {
    return async (dispatch, getState) => {
        try {
            // Gọi dịch vụ để lấy dữ liệu sản phẩm theo ID cửa hàng
            const res = await fetchProductsByIdStoreService(id);
            // Kiểm tra và lấy dữ liệu từ phản hồi
            const data = res && res.data ? res.data.data : [];
            // Gửi action fetchProductsByIdStoreSuccess với dữ liệu sản phẩm
            dispatch(fetchProductsByIdStoreSuccess(data)); // Chạy ở đây (2)
            // console.log(data);
        } catch (error) {
            // In ra lỗi nếu có
            console.log(error);
        }
    }
};
// rating product by id
const fetchRatingProductByIdSuccess = (data) => {
    return {
        type: types.FETCH_RATING_PRODUCT_BY_ID_SUCCESS,
        dataRatingProduct: data
    };
};
const fetchProductsBySearchQuerySuccess = (data) => {
    return {
        type: types.FETCH_PRODUCT_BY_SEARCH_QUERY_SUCCESS,
        dataProducts: data
    };
};
const fetchProductBySearch = (query) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchProductsBySearchQueryService(query);
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchProductsBySearchQuerySuccess(data)); // // Chạy ở đây (2)

        } catch (error) {
            console.log(error);
        }
    }
}
const resetComboDetail = () => {
    return {
        type: types.RESET_COMBO_DETAIL
    };
}

export {
    fetchProductsByIdCategory,
    fetchAllCombos,
    fetchAllDrinks,
    fetchProductById,
    fetchProductsByIdStore,
    fetchComboById,
    fetchAllProducts,
    fetchProductBySearch,
    // resetComboDetail
    resetComboDetail

}