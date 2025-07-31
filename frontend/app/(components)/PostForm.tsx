// frontend/app/(components)/PostForm.tsx

'use client';

import { useState, useRef, useTransition } from 'react';
import { createPost } from '@/app/lib/actions';
import ImageUpload from './ImageUpload'; // Import the new component

export default function PostForm() {
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // We need preventDefault because we are handling submission manually
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    // Check if an image was selected
    if (!selectedImage) {
      setError('Please select an image.');
      return;
    }

    // Append the selected image file to the FormData
    formData.append('image', selectedImage);

    startTransition(async () => {
      const result = await createPost(formData);
      if (result.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
        setSelectedImage(null); // Reset the selected image state
        // The preview will disappear automatically as ImageUpload will re-render
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Post</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            rows={5}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mb-6">
          {/* Use the ImageUpload component here */}
          <ImageUpload onImageSelect={setSelectedImage} />
        </div>
        
        {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
        >
          {isPending ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}