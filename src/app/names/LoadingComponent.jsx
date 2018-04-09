import React from 'react';
import loadingImage from '../blue-loading.gif';
import { compose, defaultProps } from 'recompose';

const enhance = compose(
  defaultProps({
    className: 'text-center',
    styleImg: {
      width: '5%'
    }
  })
);
const LoadingComponent = ({ className, styleImg }) => (
  <div className={className}>
    <img alt="loading..." style={styleImg}  
        src={loadingImage} />
  </div>
);
export default enhance(LoadingComponent);
