import { collection, getDocs, query, where } from "firebase/firestore";
import firestore from "../../../firestore/firestore";
import { getUserTrips } from "../../users/firestore";
import { getFavorites } from "../favorites/firestore";
import { toTrip, Trip, TripData } from "../trip";
import config from "./config";
import { getRecommendationBasis } from "./recommendationBasis";
import recommendationScore from "./recommendationScore";

const getTripsOfOtherUsers = async (userUid: string): Promise<Trip[]> => {
  const tripDocuments = await getDocs(
    query(collection(firestore, "trip"), where("posterUid", "!=", userUid)),
  );
  return await Promise.all(
    tripDocuments.docs.map((tripDocument) =>
      toTrip(tripDocument.id, tripDocument.data() as TripData),
    ),
  );
};

export const getRecommendedTrips = async (
  userUid: string,
  amount: number,
): Promise<Trip[]> => {
  const favorites = await getFavorites(userUid);
  const userTrips = await getUserTrips(userUid);
  const allTrips = await getTripsOfOtherUsers(userUid);
  const basis = getRecommendationBasis(favorites, userTrips);
  const withScore = allTrips.map((trip) => ({
    trip: trip,
    score: recommendationScore(config, basis, trip),
  }));
  withScore.sort((trip1, trip2) => trip2.score - trip1.score);
  return withScore.slice(0, amount).map((scoredTrip) => scoredTrip.trip);
};
