// src/components/ImageUpload.js
import React from 'react';
import useFirebase from '../config/useFirebase';

const ImageUpload = () => {
  const { imageUrl, handleImageUpload } = useFirebase();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;