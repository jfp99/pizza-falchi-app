'use client';
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  category?: 'pizzas' | 'boissons' | 'desserts' | 'accompagnements';
}

export default function ImageUpload({ currentImage, onImageChange, category = 'pizzas' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop grande (max 5MB)');
      return;
    }

    setUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPreview(data.url);
      onImageChange(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors du téléchargement de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleClick}
            className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center space-x-2"
            type="button"
          >
            <Upload className="w-4 h-4" />
            <span>Changer</span>
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all
            ${dragActive ? 'border-primary-red bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {uploading ? (
            <div className="space-y-4">
              <div className="animate-spin mx-auto w-12 h-12 border-4 border-primary-red border-t-transparent rounded-full"></div>
              <p className="text-gray-600">Téléchargement en cours...</p>
            </div>
          ) : (
            <>
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Cliquez pour télécharger une image
              </p>
              <p className="text-sm text-gray-500 mb-2">
                ou glissez-déposez une image ici
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG jusqu'à 5MB
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
