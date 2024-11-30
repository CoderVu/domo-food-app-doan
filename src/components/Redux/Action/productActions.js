import types from "../types";
import {
    fetchProductsBestSaleService,
    fetchProductsByIdCategoryService,
    fetchAllCombosService,
    fetchProductByIdService,
    fetchComboByIdService,
    fetchProductsByIdStoreService,
    fetchRatingProductByIdService,
    fetchAllDrinksService,
    fetchAllProductsService,
    fetchProductsBySearchQueryService

} from "../../Redux/Services/ProductService";
import { fetchUserDetailByIdService } from "../../Redux/Services/UserService";
import { toast } from "react-toastify";

// Best sale
const fetchProductsBestSaleSuccess = (data) => {
    return {
        type: types.FETCH_PRODUCT_BEST_SALE_SUCCESS,
        dataProducts: data
    };
};
const fetchProductsBestSale = () => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchProductsBestSaleService();
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchProductsBestSaleSuccess(data)); // // Chạy ở đây (2)
           // console.log(data);
        } catch (error) {
            //console.log(error);
        }
    }
};
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
        dataCombos: data
    };
};
const fetchAllCombos = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchAllCombosService();
            const data = res && res.data ? res.data.data : [];
            dispatch(fetchAllCombosSuccess(data)); // // Chạy ở đây (2)
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
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
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
};

// by idProduct => Product Detail
const fetchProductByIdSuccess = (data) => {
    return {
        type: types.FETCH_PRODUCT_BY_ID_SUCCESS,
        productDetail: data
    };
};
const fetchProductById = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchProductByIdService(id);
            const data = res && res.data ? res.data.data[0] : {};
            dispatch(fetchProductByIdSuccess(data)); // // Chạy ở đây (2)
            // console.log(data);
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
            dispatch(fetchComboByIdSuccess(data)); // // Chạy ở đây (2)
           // console.log(data);
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
const fetchRatingProductById = (id) => {
    return async (dispatch, getState) => {
        try {
            const resRating = await fetchRatingProductByIdService(id);
            let dataRating = resRating && resRating.data ? resRating.data.data : [];
            // Lấy thêm avatar + fullname User cho từng phần tử trong dataRating
            dataRating = await Promise.all(
                dataRating.map(async (rating) => {
                    const resUser = await fetchUserDetailByIdService(rating.userId);
                    const dataUser = resUser && resUser.data ? resUser.data.data : {};
                    return {
                        ...rating,
                        dataUser: dataUser,
                    };
                })
            );
            dispatch(fetchRatingProductByIdSuccess(dataRating));
          //  console.log('dataRating: ', dataRating);
        } catch (error) {
            console.log(error);
            toast.error('Không lấy được đánh giá sản phẩm!')
        }
    }
};
const fetchProductsBySearchQuerySuccess = (data) => {
    return {
        type: types.FETCH_PRODUCT_BY_SEARCH_QUERY_SUCCESS,
        dataProducts: data
    };
};
const fetchProductBySearch= (query) => {
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

export {
    fetchProductsBestSale,
    fetchProductsByIdCategory,
    fetchAllCombos,
    fetchAllDrinks,
    fetchProductById,
    fetchProductsByIdStore,
    fetchRatingProductById,
    fetchComboById,
    fetchAllProducts,
    fetchProductBySearch

}