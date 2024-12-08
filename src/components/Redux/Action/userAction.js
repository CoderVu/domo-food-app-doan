import types from "../types";
import { addProductToCartService,
    fetchProductsInCartService,
    increaseOneQuantityService,
    decreaseOneQuantityService,
} from "../../Redux/Services/UserService";
import { fetchProductByIdService } from "../../Redux/Services/ProductService";
import { fetchStoreByIdService } from "../../Redux/Services/storeService";

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading,
  });
  
  export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
  });
  
  const fetchProductsInCartSuccess = (dataProducts, dataCombos) => {
    return {
        type: types.FETCH_PRODUCT_CART_SUCCESS,
        dataProducts,
        dataCombos,
    };
};
const fetchProductsInCart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchProductsInCartService();
            let data = res && res.data && res.data.data ? res.data.data : [];
            // Lọc chỉ lấy sản phẩm có type là 'product'
            let dataProducts = data.filter((cartItem) => cartItem.type === 'product');
            dataProducts = await Promise.all(
                dataProducts.map(async (productInCart) => {
                    const resStore = await fetchStoreByIdService(productInCart.product.storeId);
                    // Thêm thông tin cửa hàng -> storeId -> infor store
                    const dataStore = resStore && resStore.data ? resStore.data.data : {};
                    return {
                        ...productInCart,
                        product: {
                            ...productInCart.product,
                            dataStore: dataStore, // Thêm thông tin từ dataStore vào product
                        },
                        cartId: productInCart.cartId // Đảm bảo cartId có sẵn
                    };
                })
            );
            // Lọc chỉ lấy sản phẩm có type là 'combo'
            let dataCombos = data.filter((cartItem) => cartItem.type === 'combo');
            dataCombos = await Promise.all(
                dataCombos.map(async (comboItem) => {
                    // Thông tin Store
                    const resStore = await fetchStoreByIdService(comboItem.combo.storeId);
                    const dataStore = resStore && resStore.data ? resStore.data.data : {};
                    // Thông tin drink -> note: Chỉ có 1 drink
                    const resDrink = await fetchProductByIdService(comboItem.combo.drinkId[0]);
                    const dataDrink = resDrink && resDrink.data ? resStore.data.data : {};
                    return {
                        ...comboItem,
                        combo: {
                            ...comboItem.combo,
                            dataStore: dataStore,
                            dataDrink: dataDrink
                        },
                        cartId: comboItem.cartId // Đảm bảo cartId có sẵn
                    };
                })
            );
            // Kiểm tra nếu giỏ hàng rỗng
            if (data.length === 0) {
                console.log("Giỏ hàng trống");
                dispatch(fetchProductsInCartSuccess([]));  // Gửi array rỗng đến redux
            }
            else {
                dispatch(fetchProductsInCartSuccess(dataProducts, dataCombos));
            }
        } catch (error) {
            console.log(error);
            dispatch(fetchProductsInCartSuccess([]));
        }
    }
};
const decreaseOneQuantity = (cartId, newQuantity) => {
    return async (dispatch) => {
      try {
        await decreaseOneQuantityService(cartId, newQuantity);
        dispatch({
          type: types.DECREASE_ITEM_QUANTITY,
          payload: { cartId, newQuantity },
        });
      } catch (error) {
        console.log(error);
        dispatch(setError(error));
      }
    };
  };
  
  const increaseOneQuantity = (cartId, newQuantity) => {
    return async (dispatch) => {
      try {
        await increaseOneQuantityService(cartId, newQuantity);
        dispatch({
          type: types.INCREASE_ITEM_QUANTITY,
          payload: { cartId, newQuantity },
        });
      } catch (error) {
        console.log(error);
        dispatch(setError(error));
      }
    };
  };

export {
    fetchProductsInCart,
    increaseOneQuantity,
    decreaseOneQuantity,
}
