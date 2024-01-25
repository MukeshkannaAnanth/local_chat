// ImageViewer.js
import React from 'react';
import Gallery from 'react-image-gallery';

const ImageViewer = ({ images }) => {
  return (
    <div>
      <Gallery items={images} />
    </div>
  );
};

export default ImageViewer;
