import React from 'react';
import loadingImage from '../blue-loading.gif';
import { compose, defaultProps } from 'recompose';
import PropTypes from 'prop-types';

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
LoadingComponent.propTypes = {
  className: PropTypes.string,
  styleImg: PropTypes.object
};
export default enhance(LoadingComponent);
