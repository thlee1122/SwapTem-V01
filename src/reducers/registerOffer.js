import * as types from '../actions/registerOfferTypes';

export const initialState = {
  registeredOffer: {}
};

const registerOffer = (state = initialState, action) => {
  
  switch (action.type) {

    case types.POST_OFFER_LOADING:
      debugger;
      return { ...state, loading: true, data: null};

    case types.POST_OFFER_SUCCESS:
      debugger;
      return { ...state, loading: false, registeredOffer: action };

    case types.POST_OFFER_ERROR:
      debugger;
      return { ...state, loading: false, error: action.data};

    default: {
      return state;
    }
  }
}

export default registerOffer;