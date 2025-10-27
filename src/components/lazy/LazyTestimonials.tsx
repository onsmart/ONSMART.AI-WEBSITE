
import React from 'react';

const LazyTestimonials = React.lazy(() => 
  import('@/components/shared/Testimonials').then(module => ({
    default: module.default
  }))
);

export default LazyTestimonials;
