// Keep up to date with backend
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

export interface Trip extends TripSubmission {
  tripId: string;
  averageRating: number;
  ratings: number;
  postDate: string;
}
