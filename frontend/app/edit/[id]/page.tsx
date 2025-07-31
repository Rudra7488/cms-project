// frontend/app/edit/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Post } from '@/app/lib/definitions';
import { updatePost } from '@/app/lib/actions';
import Link from 'next/link';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

// Data fetching function
async function getPostById(id: number): Promise<Post | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const post = await getPostById(id);

  if (!post) {
    notFound(); // Agar post na mile to 404 page dikhayein
  }

  // Bind the post id to the updatePost server action
  const updatePostWithId = updatePost.bind(null, post.id);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h1>
      <form action={updatePostWithId}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={post.title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            defaultValue={post.content}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            Save Changes
          </button>
          <Link href="/" className="ml-4 text-gray-600 hover:text-gray-800">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}