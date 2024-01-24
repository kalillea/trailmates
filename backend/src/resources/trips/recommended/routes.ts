import { Express, Request, Response } from "express";
import { parseTripQuery } from "../queryParsing";
import { getRecommendedTrips } from "./firestore";

export const startRecommendedRoutes = (app: Express) => {
  app.get(
    "/trips/recommended/:userUid",
    async (req: Request, res: Response) => {
      const { amount = 20 } = parseTripQuery(req.query);
      try {
        const userUid = req.params.userUid;
        const recommendedTrips = await getRecommendedTrips(userUid, amount);
        res.json(recommendedTrips);
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );
};
