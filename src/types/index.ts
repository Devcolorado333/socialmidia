export interface Category {
  id: string;
  name: string;
  order: number;
  description?: string;
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  categoryId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

