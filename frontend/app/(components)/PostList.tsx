// frontend/app/(components)/PostList.tsx

import { Post } from '@/app/lib/definitions';
import PostCard from './PostCard';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

async function getPosts(): Promise<Post[]> {
  try {
    // Using { cache: 'no-store' } ensures we always get the latest data.
    const response = await fetch(`${BACKEND_URL}/api/posts`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const data = await response.json();
    // Assuming the backend returns data in the format { "posts": [...] }
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return an empty array in case of an error so the page doesn't crash.
    return [];
  }
}

export default async function PostList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No posts found. Create one using the form above!</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}