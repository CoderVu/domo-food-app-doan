
import { combineReducers } from 'redux';
import categoryReducer from '../Reducers/categoryReducer';
import productReducer from '../Reducers/productReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
  

});
export default rootReducer;
