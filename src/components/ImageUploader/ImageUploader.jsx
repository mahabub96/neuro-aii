/* ============================================
   IMAGE UPLOADER COMPONENT — NeuroSense AI
   Drag & drop + click to upload images
   ============================================ */

import React, { useState, useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ icon, label, sublabel, accentColor, onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG or PNG image.');
      return;
    }
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onChange = (e) => handleFile(e.target.files[0]);

  const reset = () => {
    setPreview(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={`uploader ${isDragging ? 'uploader--dragging' : ''}`}
      style={{ '--accent': accentColor, '--accent-glow': `${accentColor}40` }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => !preview && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={onChange}
        hidden
      />

      {preview ? (
        <div className="uploader__preview">
          <img src={preview} alt="Uploaded scan" className="uploader__image" />
          <button className="uploader__reset" onClick={(e) => { e.stopPropagation(); reset(); }}>
            ✕ Remove
          </button>
        </div>
      ) : (
        <div className="uploader__placeholder">
          <div className="uploader__icon">{icon}</div>
          <p className="uploader__label">{label}</p>
          <p className="uploader__sublabel">{sublabel}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
