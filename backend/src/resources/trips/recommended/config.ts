import {
  alreadyVisitedAttractions,
  alreadyVisitedCountries,
  averageRating,
  Consideration,
  differentPriceFromFavorites,
  differentPriceFromUserTrips,
  likedAttractions,
  likedCountries,
} from "./considerations";

export default {
  // Each consideration alters the recommendation score
  considerations: [
    // (weight)
    averageRating(1),
    alreadyVisitedAttractions(-1),
    likedAttractions(1),
    alreadyVisitedCountries(-0.5),
    likedCountries(0.5),
    // (moreExpensiveWeight, cheaperWeight)
    differentPriceFromFavorites(0, 0),
    differentPriceFromUserTrips(-0.5, 0.1),
  ],
};

export interface RecommendationConfig {
  considerations: Consideration[];
}
