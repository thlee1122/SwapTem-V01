import * as types from '../actions/singleProductTypes';

export const initialState = {
  singleProductDetail: {},
  likedItem: []
};

const singleProduct = (state = initialState, action) => {

  
  
  switch (action.type) {
    case types.GET_PRODUCT_DETAIL_LOADING:
      debugger;      
      return { ...state, loading: true, data: null};

    case types.GET_PRODUCT_DETAIL_SUCCESS:
      debugger;
      return { ...state, loading: false, singleProductDetail: action.data };

    case types.GET_PRODUCT_DETAIL_ERROR:
      debugger;
      return { ...state, loading: false, error: action.data };


    case types.POST_LIKE_LOADING:
      debugger;
      return { ...state, loading: true, data: null};

    case types.POST_LIKE_SUCCESS:
      debugger;
      return { ...state, loading: false, likedItem: action.data };

    case types.POST_LIKE_ERROR:
      debugger;
      return { ...state, loading: false, error: action.data};

    default: {
      return state;
    }
  }
}

export default singleProduct;