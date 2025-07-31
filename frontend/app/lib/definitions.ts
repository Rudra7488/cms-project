// frontend/app/lib/definitions.ts

export type Post = {
  id: number;
  title: string;
  content: string;
  image_url: string; // URL for the image coming from the Flask backend
};