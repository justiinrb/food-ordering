// src/hooks/useFirebase.js
import { useState } from 'react';
import { uploadImage } from '../config/firebaseService';

const useFirebase = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (file) => {
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return { imageUrl, handleImageUpload };
};

export default useFirebase;