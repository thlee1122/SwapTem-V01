import * as types from './registerOfferTypes';

export const postOffer = (data) => {
  debugger;
  return (dispatch, getState) => {
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'POST',
        // service: 'follow',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        data: data,
        endpoint: `http://3.17.41.182:3000/v1/offer/create`,
        actionTypes: {
          success: types.POST_OFFER_SUCCESS,
          loading: types.POST_OFFER_LOADING,
          error: types.POST_OFFER_ERROR
        }
      }
    });
  };
};