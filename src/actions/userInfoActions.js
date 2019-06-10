import * as types from './userInfoTypes';

export const getUserInfo = () => {
  return (dispatch, getState) => {
    // debugger;
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        headers: {
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        endpoint: `http://3.17.41.182:3000/v1/user/base`,
        actionTypes: {
          success: types.GET_USER_INFO_SUCCESS,
          loading: types.GET_USER_INFO_LOADING,
          error: types.GET_USER_INFO_ERROR
        }
      }
    });
  };
};

export const getUserProfileInfo = (profileSection) => {
  return (dispatch, getState) => {
    // debugger;
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        headers: {
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        endpoint: `http://3.17.41.182:3000/v1/user/my-profile?type=${profileSection}`,
        actionTypes: {
          success: profileSection === "banner" ? types.GET_USER_PROFILE_INFO_BANNER_SUCCESS : 
          profileSection === "badge" ? types.GET_USER_PROFILE_INFO_BADGE_SUCCESS : 
          profileSection === "item" ? types.GET_USER_PROFILE_INFO_ITEM_SUCCESS : null,

          loading: profileSection === "banner" ? types.GET_USER_PROFILE_INFO_BANNER_LOADING : 
          profileSection === "badge" ? types.GET_USER_PROFILE_INFO_BADGE_LOADING : 
          profileSection === "item" ? types.GET_USER_PROFILE_INFO_ITEM_LOADING : null,

          error: profileSection === "banner" ? types.GET_USER_PROFILE_INFO_BANNER_ERROR : 
          profileSection === "badge" ? types.GET_USER_PROFILE_INFO_BADGE_ERROR : 
          profileSection === "item" ? types.GET_USER_PROFILE_INFO_ITEM_ERROR : null,

          // success: types.GET_USER_PROFILE_INFO_BANNER_SUCCESS,
          // loading: types.GET_USER_PROFILE_INFO_BANNER_LOADING,
          // error: types.GET_USER_PROFILE_INFO_BANNER_sERROR
        }
      }
    });
  };
}
