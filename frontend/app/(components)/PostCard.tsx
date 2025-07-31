// frontend/app/(components)/PostCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/app/lib/definitions';
import { Trash2, Edit } from 'lucide-react'; // Icons import karein
import { deletePost } from '@/app/lib/actions';

export default function PostCard({ post }: { post: Post }) {
  const imageUrl = post.image_url;

  const handleDelete = async () => {
    // User se confirmation maangein
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      const result = await deletePost(post.id);
      if (result.error) {
        alert(`Failed to delete: ${result.error}`);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
      <div>
        <div className="relative w-full h-56">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
          <p className="text-gray-600 line-clamp-3">{post.content}</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2">
        <Link href={`/edit/${post.id}`} className="flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Link>
        <button onClick={handleDelete} className="flex items-center px-3 py-1 text-sm text-red-600 bg-red-100 rounded-md hover:bg-red-200">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
}