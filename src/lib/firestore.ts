import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Category, Slide } from '@/types';

// Categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const q = query(collection(db, 'categories'), orderBy('order'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), category);
    return docRef.id;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<boolean> => {
  try {
    await updateDoc(doc(db, 'categories', id), category);
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    return false;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'categories', id));
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

// Slides
export const getSlides = async (categoryId?: string): Promise<Slide[]> => {
  try {
    let q;
    if (categoryId) {
      q = query(
        collection(db, 'slides'), 
        where('categoryId', '==', categoryId),
        orderBy('order')
      );
    } else {
      q = query(collection(db, 'slides'), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Slide;
    });
  } catch (error) {
    console.error('Error getting slides:', error);
    return [];
  }
};

export const getSlide = async (id: string): Promise<Slide | null> => {
  try {
    const docSnap = await getDoc(doc(db, 'slides', id));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Slide;
    }
    return null;
  } catch (error) {
    console.error('Error getting slide:', error);
    return null;
  }
};

export const createSlide = async (slide: Omit<Slide, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'slides'), {
      ...slide,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating slide:', error);
    return null;
  }
};

export const updateSlide = async (id: string, slide: Partial<Omit<Slide, 'id' | 'createdAt'>>): Promise<boolean> => {
  try {
    await updateDoc(doc(db, 'slides', id), {
      ...slide,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating slide:', error);
    return false;
  }
};

export const deleteSlide = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'slides', id));
    return true;
  } catch (error) {
    console.error('Error deleting slide:', error);
    return false;
  }
};

