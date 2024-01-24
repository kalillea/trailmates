import { getBlob, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";

export const uploadFile = async (file: File, path: string) => {
  const reference = ref(storage, path);

  await uploadBytes(reference, file).then((snapshot) => {
    console.log(`Uploaded a blob or file to ${path}!`);
  });
};

export const downloadFile = async (path: string) => {
  const reference = ref(storage, path);
  try {
    return await getBlob(reference);
  } catch (error) {}

  return null;
};

export const getImgUrl = async (path: string) => {
  const reference = ref(storage, path);
  return getDownloadURL(reference);
};
