
import { combineReducers } from 'redux';
import categoryReducer from '../Reducers/categoryReducer';
import productReducer from '../Reducers/productReducer';
import userReducer from '../Reducers/userReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
  

});
export default rootReducer;
