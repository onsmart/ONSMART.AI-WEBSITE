
import React from 'react';

const LazyClientLogos = React.lazy(() => 
  import('@/components/shared/ClientLogos').then(module => ({
    default: module.default
  }))
);

export default LazyClientLogos;
