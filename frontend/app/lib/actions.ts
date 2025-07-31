// frontend/app/lib/actions.ts (poori file)
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

// Pehle wala createPost function...
export async function createPost(formData: FormData) {
  // ... (yeh waisa hi rahega, koi badlaav nahi)
  const backendFormData = new FormData();
  backendFormData.append('title', formData.get('title') as string);
  backendFormData.append('content', formData.get('content') as string);
  backendFormData.append('image', formData.get('image') as File);
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/posts/create`, {
      method: 'POST',
      body: backendFormData,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to create post.');
    revalidatePath('/');
    return { success: true, post: result.post };
  } catch (error) {
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: 'An unknown error occurred.' };
  }
}

// =========================================================
// === NAYA FUNCTION 1: DELETE POST ===
export async function deletePost(id: number) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post.');
    }
    // Home page ko refresh karein taaki post list update ho jaaye
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: 'An unknown error occurred.' };
  }
}

// === NAYA FUNCTION 2: UPDATE POST ===
export async function updatePost(id: number, formData: FormData) {
  const postData = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to update post.');
    }
    // Update hone ke baad, home page par waapas redirect karein
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'An unknown error occurred.' };
  }
  // Yeh try-catch block ke bahar hoga taaki error hone par redirect na ho
  revalidatePath('/');
  redirect('/');
}