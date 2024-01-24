import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  deleteDoc,
} from "firebase/firestore";
import firestore from "../../firestore/firestore";
import { toTrip, toTripData, Trip, TripData, TripSubmission } from "./trip";

export const getTripById = async (tripId: string): Promise<Trip | null> => {
  const tripDocument = await getDoc(doc(firestore, "trip", tripId));
  if (!tripDocument.exists()) {
    return null;
  }
  return await toTrip(tripDocument.id, tripDocument.data() as TripData);
};

export const getTrips = async (
  amount: number | undefined = undefined,
): Promise<Trip[]> => {
  const tripDocuments =
    amount === undefined
      ? await getDocs(collection(firestore, "trip"))
      : await getDocs(query(collection(firestore, "trip"), limit(amount)));

  return await Promise.all(
    tripDocuments.docs.map((tripDocument) =>
      toTrip(tripDocument.id, tripDocument.data() as TripData),
    ),
  );
};

export const putTrip = async (
  tripId: string,
  tripSubmission: TripSubmission,
) => {
  await setDoc(doc(firestore, "trip", tripId), tripSubmission, { merge: true });
};

export const postTrip = async (
  tripSubmission: TripSubmission,
): Promise<Trip> => {
  const tripData = toTripData(tripSubmission);
  const collectionReference = await addDoc(
    collection(firestore, "trip"),
    tripData,
  );
  return await toTrip(collectionReference.id, tripData);
};

export const getTopRatedTrips = async (amount: number) => {
  // Can't be sorted with queries, since average rating is not stored.
  const trips: Trip[] = await getTrips();
  trips.sort((t1, t2) => t2.averageRating - t1.averageRating);
  return trips.slice(0, amount);
};

export const getLatestTrips = async (amount: number) => {
  const tripDocuments = await getDocs(
    query(
      collection(firestore, "trip"),
      orderBy("postDate", "desc"),
      limit(amount),
    ),
  );
  return await Promise.all(
    tripDocuments.docs.map((tripDocument) =>
      toTrip(tripDocument.id, tripDocument.data() as TripData),
    ),
  );
};

export const deleteTrip = async (tripId: string) => {
  await deleteDoc(doc(firestore, "trip", tripId));
};
