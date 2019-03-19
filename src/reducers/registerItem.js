import * as types from '../actions/registerItemTypes';

export const initialState = {
  postItem: {},
  metadata: {},
  getItem: {},
  imageDetection: {},
  recommendedHashTags: []
};

const registerItem = (state = initialState, action) => {
  // console.log("1111", action);
  // console.log("2222", action.options);
  // console.log("3333", action.options.actionTypes);
  // console.log("4444", action.actionTypes);
  // debugger;
  
  switch (action.type) {
    case types.DETECT_IMAGE_LOADING:
      // debugger;
      return { ...state, loading: true, data: null};

    case types.DETECT_IMAGE_SUCCESS:
      // debugger;
      return { ...state, loading: false, imageDetection: action.data };

    case types.DETECT_IMAGE_ERROR:
      // debugger;
      return { ...state, loading: false, error: action.data };  




    case types.POST_ITEM_LOADING:
      // debugger;
      return { ...state, loading: true, data: null};

    case types.POST_ITEM_SUCCESS:
      // debugger;
      return { ...state, loading: false, postItem: action.data };

    case types.POST_ITEM_ERROR:
      // debugger;
      return { ...state, loading: false, error: action.data};

    case types.GET_METADATA_LOADING:
      // debugger;
      return { ...state, loading: true, data: null };

    case types.GET_METADATA_SUCCESS:
      // debugger;
      return { ...state, loading: false, metadata: action.data};

    case types.GET_METADATA_ERROR:
      // debugger;
      return { ...state, loading: false, error: action.data};


    case types.GET_RECOMMENDED_HASHTAGS_SUCCESS:
      return { ...state, loading: false, recommendedHashTags: action.data };

    case types.GET_RECOMMENDED_HASHTAGS_SUCCESS:
      return { ...state, loading: false, error: action.data};

      

    // case types.GET_ITEM_LOADING:
    //   debugger;
    //   return { ...state, loading: true, data: null };

    case types.GET_ITEM_SUCCESS:
      // debugger;
      return { ...state, loading: false, getItem: action.data};

    case types.GET_ITEM_ERROR:
      // debugger;
      return { ...state, loading: false, error: action.data};

    default: {
      return state;
    }
  }
}

export default registerItem;