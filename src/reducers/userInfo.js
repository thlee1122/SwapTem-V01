import * as types from '../actions/userInfoTypes';

export const initialState = {
  userInfo: {},
};

const userInfo = (state = initialState, action) => {
  // debugger;
  
  switch (action.type) {
    case types.GET_USER_INFO_LOADING:
      // debugger;
      return { ...state, loading: true, data: null };

    case types.GET_USER_INFO_SUCCESS:
      // debugger;
      return { ...state, loading: false, userInfo: action.data};

    case types.GET_USER_INFO_ERROR:
      // debugger;
      return { ...state, loading: false, error: action.data};

      
    default: {
      return state;
    }
  }
}

export default userInfo;