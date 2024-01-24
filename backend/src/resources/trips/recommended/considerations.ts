import { Trip } from "../trip";
import { RecommendationBasis } from "./recommendationBasis";

// Each consideration set up in config alters the recommendation score of a Trip by a certain amount, based on the recommendation basis.

export type Consideration = (basis: RecommendationBasis, trip: Trip) => number;

export const averageRating: (weight: number) => Consideration =
  (weight) => (basis, trip) => {
    return trip.averageRating * weight;
  };

export const differentPriceFromFavorites: (
  moreExpensiveWeight: number,
  cheaperWeight: number,
) => Consideration = (moreExpensiveWeight, cheaperWeight) => (basis, trip) => {
  const relativeDeviation = trip.price / basis.favoritesPriceMean;
  if (isNaN(relativeDeviation)) return 0; //There are no favorites.
  if (relativeDeviation >= 1) {
    return (relativeDeviation - 1) * moreExpensiveWeight;
  }
  return (1 - relativeDeviation) * cheaperWeight;
};

export const differentPriceFromUserTrips: (
  moreExpensiveWeight: number,
  cheaperWeight: number,
) => Consideration = (moreExpensiveWeight, cheaperWeight) => (basis, trip) => {
  const relativeDeviation = trip.price / basis.userTripsPriceMean;
  if (isNaN(relativeDeviation)) return 0; //There are no userTrips
  if (relativeDeviation >= 1) {
    return (relativeDeviation - 1) * moreExpensiveWeight;
  }
  return (1 - relativeDeviation) * cheaperWeight;
};

export const alreadyVisitedAttractions: (weight: number) => Consideration =
  (weight) => (basis, trip) => {
    const alreadyVisitedAttractions = trip.attractions.filter((attraction) =>
      basis.visitedAttractions.has(attraction),
    );
    return alreadyVisitedAttractions.length * weight;
  };

export const likedAttractions: (weight: number) => Consideration =
  (weight) => (basis, trip) => {
    const likedAttractions = trip.attractions.filter((attraction) =>
      basis.likedAttractions.has(attraction),
    );
    return likedAttractions.length * weight;
  };

export const alreadyVisitedCountries: (weight: number) => Consideration =
  (weight) => (basis, trip) => {
    const alreadyVisitedCountries = trip.countries.filter((country) =>
      basis.visitedCountries.has(country),
    );
    return alreadyVisitedCountries.length * weight;
  };

export const likedCountries: (weight: number) => Consideration =
  (weight) => (basis, trip) => {
    const likedCountries = trip.countries.filter((country) =>
      basis.likedCountries.has(country),
    );
    return likedCountries.length * weight;
  };
