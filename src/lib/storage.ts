import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (file: File, path: string): Promise<string | null> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const deleteImage = async (path: string): Promise<boolean> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export const getImagePath = (slideId: string, fileName: string): string => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();
  return `slides/${slideId}/${timestamp}.${extension}`;
};

