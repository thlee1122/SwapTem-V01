import status from './status';
import member from './member';
import recipes from './recipes';
import locale from './locale';
import registerItem from './registerItem';
import singleItem from './singleItem';
import userInfo from './userInfo';
import registerOffer from './registerOffer';
import recommendedHashTags from './recommendedHashTags';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  // recipes,
  locale,
  registerItem,
  singleItem,
  userInfo,
  registerOffer,
  recommendedHashTags
};
