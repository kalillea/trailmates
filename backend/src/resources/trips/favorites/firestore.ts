import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firestore from "../../../firestore/firestore";
import { getTripById } from "../firestore";
import { Trip } from "../trip";

const favoritesQuery = (userUid: string) =>
  query(collection(firestore, "favorites"), where("userUid", "==", userUid));

const tripQuery = (userUid: string, tripId: string) =>
  query(
    collection(firestore, "favorites"),
    where("userUid", "==", userUid),
    where("tripId", "==", tripId),
  );

export const getFavorites = async (userUid: string): Promise<Trip[]> => {
  const favoritesDocuments = await getDocs(favoritesQuery(userUid));
  const tripIds: string[] = favoritesDocuments.docs.map(
    (favoritesDocument) => favoritesDocument.data().tripId,
  );
  const maybeFavorites: (Trip | null)[] = await Promise.all(
    tripIds.map(getTripById),
  );
  return maybeFavorites.filter((trip) => trip !== null) as Trip[];
};

export const setFavorite = async (userUid: string, tripId: string) => {
  const tripDocuments = await getDocs(tripQuery(userUid, tripId));
  const tripIsFavoriteOfUser = !tripDocuments.empty;
  if (!tripIsFavoriteOfUser) {
    await addDoc(collection(firestore, "favorites"), {
      userUid: userUid,
      tripId: tripId,
    });
  }
};

export const setNotFavorite = async (userUid: string, tripId: string) => {
  const tripDocuments = await getDocs(tripQuery(userUid, tripId));
  tripDocuments.forEach((document) => deleteDoc(document.ref));
};
