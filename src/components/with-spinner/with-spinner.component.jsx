import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Remember all HOC like this returns modified functional component
// One way of writing it
// const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
//   return isLoading ? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//   ) : (
//     // This way props are passed to the component we wrap
//     <WrappedComponent {...otherProps} />
//   );
// };

// Explicit way of writing it
const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      // This way props are passed to the component we wrap
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
