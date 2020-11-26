import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

// Selector to map string id to number id
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map(key => collections[key]) 
  // Get all the keys and map the array of keys so we get the value of our collections object at that
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
    // collections.find(  // No more collections find because it's no longer an array
    //   (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    // )
  )
);

const testObject = { a: 1, b: 2, c: 3 };

Object.keys(testObject);
