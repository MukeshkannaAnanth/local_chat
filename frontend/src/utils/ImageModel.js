import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const SingleImageViewer = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => {
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <img
        src={`https://img.freepik.com/free-vector/gradient-chinese-new-year-photocall-template_23-2149209739.jpg?w=900&t=st=1705649546~exp=1705650146~hmac=2a0abf95da043503a73be402e3443f6f6905dc98e99094343327703bd89a652d`}
        alt="Single Image"
        onClick={openLightbox}
        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
      />

      {isOpen && (
        <Lightbox
          mainSrc={`https://img.freepik.com/free-vector/gradient-chinese-new-year-photocall-template_23-2149209739.jpg?w=900&t=st=1705649546~exp=1705650146~hmac=2a0abf95da043503a73be402e3443f6f6905dc98e99094343327703bd89a652d`}
          onCloseRequest={closeLightbox}
        />
      )}
    </div>
  );
};

export default SingleImageViewer;
