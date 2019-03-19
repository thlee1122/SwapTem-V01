import * as types from '../actions/registerItemTypes';

export const initialState = {
  recommendedHashTags: []
};

const recommendedHashTags = (state = initialState, action) => {
  switch (action.type) {
    


    case types.GET_RECOMMENDED_HASHTAGS_SUCCESS:
      return { ...state, loading: false, recommendedHashTags: action.data };

    case types.GET_RECOMMENDED_HASHTAGS_ERROR:
      return { ...state, loading: false, error: action.data};

  

    default: {
      return state;
    }
  }
}

export default recommendedHashTags;