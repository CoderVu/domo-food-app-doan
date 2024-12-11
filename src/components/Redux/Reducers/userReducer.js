import types from "../types";

const initialState = {
  dataProducts: [],
  dataCombos: [],
  loading: true,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        dataProducts: action.dataProducts,
        dataCombos: action.dataCombos,
        loading: false,
        error: null,
      };
    case types.INCREASE_ITEM_QUANTITY:
      return {
        ...state,
        dataProducts: state.dataProducts.map((item) =>
          item.cartId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        dataCombos: state.dataCombos.map((item) =>
          item.cartId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        loading: false,
        error: null,
      };
    case types.DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        dataProducts: state.dataProducts.map((item) =>
          item.cartId === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        dataCombos: state.dataCombos.map((item) =>
          item.cartId === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        loading: false,
        error: null,
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;