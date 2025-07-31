// frontend/app/(components)/ImageUpload.tsx

'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Pass the actual file object to the parent component
      onImageSelect(file);
    } else {
      setImagePreview(null);
      onImageSelect(null);
    }
  };

  return (
    <div>
      <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
        Image
      </label>
      <input
        type="file"
        id="image-upload-input" // Changed id to avoid conflict
        name="image"
        required
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {imagePreview && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold mb-2">Image Preview:</p>
          <img 
            src={imagePreview} 
            alt="Selected preview" 
            className="w-48 h-auto rounded-lg border p-1" 
          />
        </div>
      )}
    </div>
  );
}