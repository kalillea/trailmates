import { getAverageRating, getRatingCount } from "./comments/firestore";

export interface TripSubmission {
  startCity: string;
  destinationCity: string;
  countries: string[];
  posterUid: string;
  price: number;
  tripDurationDays: number;
  description: string;
  degreesCelcius: number;
  tripLengthKm: number;
  attractions: string[];
  imageIds: string[];
}

// Data stored in firestore
export interface TripData extends TripSubmission {
  postDate: string;
}

export interface Trip extends TripData {
  tripId: string;
  averageRating: number;
  ratings: number;
}

export const toTripData = (tripSubmission: TripSubmission): TripData => ({
  postDate: Date.now().toString(),
  ...tripSubmission,
});

export const toTrip = async (
  tripId: string,
  tripData: TripData,
): Promise<Trip> => {
  const averageRating = await getAverageRating(tripId);
  const ratings = await getRatingCount(tripId);
  return {
    tripId: tripId,
    averageRating: averageRating,
    ratings: ratings,
    ...tripData,
  };
};
