import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';

function PhotoUploader({ onPhotosChange, maxPhotos = 10 }) {
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (photos.length + acceptedFiles.length > maxPhotos) {
      toast.error(`Máximo ${maxPhotos} fotos`); return;
    }
    const newPreviews = acceptedFiles.map(f => URL.createObjectURL(f));
    setPhotos([...photos, ...acceptedFiles]);
    setPreviews([...previews, ...newPreviews]);
    onPhotosChange([...photos, ...acceptedFiles]);
  }, [photos, previews, maxPhotos]);

  const removePhoto = (index) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos(photos.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }, maxSize: 10485760
  });

  return (
    <div>
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragActive ? 'border-sovyx-600 bg-sovyx-50' : 'border-gray-300 hover:border-sovyx-400'}`}>
        <input {...getInputProps()} />
        <FiUpload className="text-4xl text-gray-400 mx-auto mb-4" />
        {isDragActive ? <p className="text-sovyx-600">Suelta las fotos aquí...</p> : <>
          <p className="text-gray-600 mb-2">Arrastra fotos o haz clic</p>
          <p className="text-sm text-gray-500">{photos.length}/{maxPhotos} fotos</p>
        </>}
      </div>

      {previews.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3 flex items-center"><FiImage className="mr-2" /> {previews.length} foto(s)</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {previews.map((preview, i) => (
              <div key={i} className="relative group">
                <img src={preview} className="w-full h-32 object-cover rounded-lg border-2" />
                <button onClick={() => removePhoto(i)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"><FiX size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoUploader;
