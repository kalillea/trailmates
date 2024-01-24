import { Trip } from "../trip";

export interface RecommendationBasis {
  favoritesPriceMean: number;
  userTripsPriceMean: number;
  visitedAttractions: Set<string>;
  likedAttractions: Set<string>;
  visitedCountries: Set<string>;
  likedCountries: Set<string>;
}

const sum = (xs: number[]): number => xs.reduce((x1, x2) => x1 + x2, 0);

// Calculating the recommendation basis at the start gets rid of redundant work.
export const getRecommendationBasis = (
  favorites: Trip[],
  userTrips: Trip[],
): RecommendationBasis => {
  const favoritesPrices = favorites.map((trip) => trip.price);
  const userTripsPrices = userTrips.map((trip) => trip.price);
  return {
    favoritesPriceMean: sum(favoritesPrices) / favorites.length,
    userTripsPriceMean: sum(userTripsPrices) / userTrips.length,
    visitedAttractions: new Set(userTrips.flatMap((trip) => trip.attractions)),
    likedAttractions: new Set(favorites.flatMap((trip) => trip.attractions)),
    visitedCountries: new Set(userTrips.flatMap((trip) => trip.countries)),
    likedCountries: new Set(favorites.flatMap((trip) => trip.countries)),
  };
};
