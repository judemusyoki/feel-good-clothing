import ShopActionTypes from './shop.types';

const updateCollections = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap
});

export default updateCollections;
