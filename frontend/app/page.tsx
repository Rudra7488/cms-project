// frontend/app/page.tsx

import PostForm from './(components)/PostForm';
import PostList from './(components)/PostList';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <div>
      <PostForm />
      
      <Suspense fallback={<p className="text-center">Loading posts...</p>}>
        <PostList />
      </Suspense>
    </div>
  );
}