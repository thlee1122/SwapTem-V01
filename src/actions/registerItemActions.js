import * as types from './registerItemTypes';

export const detectImage = (imageFile) => {
  // debugger;
  return (dispatch, getState) => {
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxZjE0M2U3LTlhMzEtNGIwNi1hMzJhLTY0NDM2NTFiMTUxZSIsImRhdGUiOiJ5eXl5LTM3LVdlOjExOjM3OjE3IiwiaWF0IjoxNTQzNDA1MDM3fQ.G0h1kh5sunxpKNcFdb5s54c0hKiXyPJhRywbR5-_sk0'
        },
        data: imageFile,
        endpoint: `http://3.17.41.182:3000/v1/item/detect`,
        actionTypes: {
          success: types.DETECT_IMAGE_SUCCESS,
          loading: types.DETECT_IMAGE_LOADING,
          error: types.DETECT_IMAGE_ERROR
        }
      }
    });
  };
};

export const postItem = (data) => {
  // debugger;
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
        endpoint: `http://3.17.41.182:3000/v1/item`,
        actionTypes: {
          success: types.POST_ITEM_SUCCESS,
          loading: types.POST_ITEM_LOADING,
          error: types.POST_ITEM_ERROR
        }
      }
    });
  };
};

export const getMetadata = () => {
  return (dispatch, getState) => {
    // debugger;
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        // endpoint: `http://18.222.137.195:3000/v1/item?offset=0`,
        endpoint: 'http://3.17.41.182:3000/v1/meta/baseData',
        actionTypes: {
          success: types.GET_METADATA_SUCCESS,
          // loading: types.GET_METADATA_LOADING,
          error: types.GET_METADATA_ERROR
        }
      }
    });
  };
};

// export const getRecommendedHashTags = () => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: 'API_REQUEST',
//       options: {
//         method: 'GET',
//         endpoint: 'http://3.17.41.182:3000/v1/item/recommendHashtags?filterId=',
//         actionTypes: {
//           success: types.GET_RECOMMENDED_HASHTAGS_SUCCESS,
//           // loading: types.GET_RECOMMENDED_HASHTAGS_LOADING,
//           error: types.GET_RECOMMENDED_HASHTAGS_ERROR
//         }
//       }
//     });
//   };
// }

export const getItem = () => {
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
        endpoint: `http://3.17.41.182:3000/v1/item?offset=0`,
        actionTypes: {
          success: types.GET_ITEM_SUCCESS,
          // loading: types.GET_ITEM_LOADING,
          error: types.GET_ITEM_ERROR
        }
      }
    });
  };
};

