import axios from 'axios';

function buildURL(options) {
	console.log("@@@", options);
	debugger;

  // let URL = '';

  // if (options.service === undefined && options.url !== undefined) {
  //   return options.url;
  // }

  if (options.service === undefined && options.endpoint !== undefined) {
    return options.endpoint;
  }

  // if (options.service === undefined) {
  //   throw "please define 'service' for options";
  // }
}

function createAxiosConfig(options) {
  console.log("@#$%", options.headers);

  let axiosConfig = {
    method: options.method.toLowerCase(),
    url: buildURL(options),
    withCredentials: options.withCredentials !== undefined ? options.withCredentials : true,
    headers: options.headers
  };

  debugger;

  if (options.data !== undefined)
    axiosConfig.data = options.data;

  return axiosConfig;
}

function successDispatch(dispatch, axiosConfig, options, response) {
	console.log("@@@@@", response);
	debugger;

  if (options.actionTypes.success === undefined)
    throw `Please define 'success' actionType for request ${axiosConfig.url}`;

  if (typeof options.actionTypes.success === 'string') {

    return dispatch({
      type: options.actionTypes.success,
      data: response.data,
      headers: {
        ...response.headers,
        status: response.status,
      }
    });

  } else if (typeof options.actionTypes.success === 'function') {

    return dispatch(
      options.actionTypes.success(response.data, {
        ...response.headers,
        status: response.status
      })
    );
  }
}

function errorDispatch(dispatch, axiosConfig, options, response) {
  if(typeof options.actionTypes.error === 'string') {
    
    const errorData = (response.response)
      ? {
        status: response.response.status,
        message: response.message,
        data: response.response.data ? response.response.data : {}
      }
      : response.message;

    return dispatch({
      type: options.actionTypes.error,
      errorno: response.errno ? response.errorno : null,
      data: errorData
    });

  } else if (typeof options.actionTypes.error === 'function') {

    return dispatch(options.actionTypes.error(response));
  }
}

function apiMiddleWare({ dispatch, getState }) {
	return next => action => {
    if (!action || !next) {
      throw "No action defined in FINDME222 ApiMiddleWare.";
    }
    const options = (action.options) ? { ...action.options } : {};

    switch (action.type) {
      case 'API_REQUEST': {

        if (!options.service === undefined && options.url === undefined)
          return next(action);

        if (options.actionTypes === undefined) {
          // throw "Please define actionTypes for API_REQUEST action";
          return next(action);
        }

        const axiosConfig = createAxiosConfig(options);

        axios(axiosConfig)
          .then(response => successDispatch(dispatch, axiosConfig, options, response))
          .catch(responseError => errorDispatch(dispatch, axiosConfig, options, responseError));

        break;
      }

      default: {
        return next(action);
        break;
      }
  	};

  	if (options.actionTypes.loading !== undefined) {
      return (typeof options.actionTypes.loading === 'function')
        ? dispatch(options.actionTypes.loading())
        : dispatch({ type: options.actionTypes.loading });
    }
	}
}

export default apiMiddleWare;

