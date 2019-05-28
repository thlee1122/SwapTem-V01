import * as types from './singleProductTypes';

export const getSingleProductDetail = (itemID) => {
  return (dispatch, getState) => {
    // debugger;
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        endpoint: `http://3.17.41.182:3000/v1/item/detail/${itemID}`,
        actionTypes: {
          success: types.GET_PRODUCT_DETAIL_SUCCESS,
          loading: types.GET_PRODUCT_DETAIL_LOADING,
          error: types.GET_PRODUCT_DETAIL_ERROR
        }
      }
    });
  };
};

// fetch('https://mywebsite.com/endpoint/', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue',
//   }),
// });

export const postLike = (itemId) => {
  // debugger;
  return (dispatch, getState) => {
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'POST',
        headers: {
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        data: itemId,
        endpoint: `http://3.17.41.182:3000/v1/item/addRemoveCart`,
        actionTypes: {
          success: types.POST_LIKE_SUCCESS,
          loading: types.POST_LIKE_LOADING,
          error: types.POST_LIKE_ERROR
        }
      }
    });
  };
};
