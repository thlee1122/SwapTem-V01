import * as types from './registerItemTypes';

export const getRecommendedHashTags = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        endpoint: 'http://3.17.41.182:3000/v1/item/recommendHashtags?filterId=',
        actionTypes: {
          success: types.GET_RECOMMENDED_HASHTAGS_SUCCESS,
          // loading: types.GET_RECOMMENDED_HASHTAGS_LOADING,
          error: types.GET_RECOMMENDED_HASHTAGS_ERROR
        }
      }
    });
  };
}
