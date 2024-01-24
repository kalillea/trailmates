import { Trip, TripSubmission } from "./trip";
import { del, get, post, put } from "../utils/fetchMethods";

export const getTrips = (): Promise<Trip[]> => get("trips/");

export const getTripById = (tripId: string): Promise<Trip> =>
  get("trips/" + tripId);

export const putTrip = (tripId: string, trip: TripSubmission) =>
  put("trips/" + tripId, trip);

export const postTrip = (trip: TripSubmission): Promise<Trip> =>
  post("trips/", trip);

export const getTopRatedTrips = (): Promise<Trip[]> =>
  get("trips/highestRated");

export const getLatestTrips = (): Promise<Trip[]> => get("trips/latest");

export const deleteTrip = (tripId: string) => del(`trips/${tripId}`);

export const getUserTrips = (userUid: string): Promise<Trip[]> =>
  get(`users/${userUid}/trips`);

export const getUserTripsCount = (userUid: string): Promise<number> =>
  get(`users/${userUid}/trips/count`);

export const getRecommendedTrips = (userUid: string): Promise<Trip[]> =>
  get(`trips/recommended/${userUid}`);
