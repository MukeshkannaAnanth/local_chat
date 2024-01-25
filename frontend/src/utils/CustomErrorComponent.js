import React from 'react';

const CustomErrorComponent = ({ error }) => {
  return (
    <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
      <p>Error loading file:</p>
      <p>{error.message}</p>
      {/* You can customize the error message or display additional information */}
    </div>
  );
};

export default CustomErrorComponent;
