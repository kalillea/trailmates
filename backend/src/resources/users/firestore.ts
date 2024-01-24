import {
  setDoc,
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { UserData } from "./user";
import { Trip, TripData, toTrip } from "../trips/trip";
import firestore from "../../firestore/firestore";

export const getUserData = async (userUid: string) => {
  const userData = await getDoc(doc(firestore, "user", userUid));
  if (!userData.exists()) {
    console.log("No such document exists!");
  }
  return userData;
};

export const putUserData = (userData: UserData) => {
  setDoc(doc(firestore, "user", userData.userUid), userData, { merge: true });
};

export const getUserTrips = async (userUid: string): Promise<Trip[]> => {
  const tripDocuments = await getDocs(
    query(collection(firestore, "trip"), where("posterUid", "==", userUid)),
  );
  return await Promise.all(
    tripDocuments.docs.map((tripDocument) =>
      toTrip(tripDocument.id, tripDocument.data() as TripData),
    ),
  );
};

export const getUserTripsCount = async (userUid: string): Promise<number> => {
  const coll = collection(firestore, "trip");
  const q = query(coll, where("posterUid", "==", userUid));
  const countSnapshot = await getCountFromServer(q);

  return countSnapshot.data().count;
};
