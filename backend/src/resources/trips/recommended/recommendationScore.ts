import { Trip } from "../trip";
import { RecommendationConfig } from "./config";
import { RecommendationBasis } from "./recommendationBasis";

// Calculates the recommendation score for a trip based on a number of considerations.
export default (
  config: RecommendationConfig,
  basis: RecommendationBasis,
  trip: Trip,
): number => {
  let score: number = 0;
  for (const consider of config.considerations) {
    score += consider(basis, trip);
  }
  return score;
};
