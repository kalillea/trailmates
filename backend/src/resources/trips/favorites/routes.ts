import { Express, Request, Response } from "express";
import { getFavorites, setFavorite, setNotFavorite } from "./firestore";

export const startFavoritesRoutes = (app: Express) => {
  app.put(
    "/trips/favorites/:userUid/:tripId",
    async (req: Request, res: Response) => {
      try {
        const userUid = req.params.userUid;
        const tripId = req.params.tripId;
        await setFavorite(userUid, tripId);
        res.json({ message: "OK" });
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );

  app.delete(
    "/trips/favorites/:userUid/:tripId",
    async (req: Request, res: Response) => {
      try {
        const userUid = req.params.userUid;
        const tripId = req.params.tripId;
        await setNotFavorite(userUid, tripId);
        res.json({ message: "OK" });
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );

  app.get("/trips/favorites/:userUid", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      const favorites = await getFavorites(userUid);
      res.json(favorites);
    } catch (error) {
      res.status(404).send(error);
    }
  });
};
