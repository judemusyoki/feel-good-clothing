import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    {/* Here we now make a dynamic route based on the URL */}
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />  {/* collectionId is a parameter */}
  </div>
);

export default ShopPage;
