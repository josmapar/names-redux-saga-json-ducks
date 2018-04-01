import React from 'react';
import loadingImage from '../blue-loading.gif';

export default (props) => (
  <div className="text-center">
    <img alt="loading..." style={{width: '5%'}}  
        src={loadingImage} />
  </div>
);
