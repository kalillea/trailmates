import { Express, Request, Response } from "express";
import { startCommentsRoutes } from "./comments/routes";
import {
  getUserData,
  getUserTrips,
  getUserTripsCount,
  putUserData,
} from "./firestore";
import { isValidUserType } from "./user";

export const startUserRoutes = (app: Express) => {
  //"users/:userUid/comments"
  startCommentsRoutes(app);

  app.get("/users/:userUid/", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      const userDocument = await getUserData(userUid);
      res.json(userDocument.data());
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.put("/users/:userUid/", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      if (isValidUserType(req.body.userType)) {
        console.log("Adding user data");
        putUserData({
          userUid: userUid,
          ...req.body,
        });
        res.json({ message: "OK" });
      } else {
        console.log("Rejecting because invalid userType: " + req.body.userType);
        res.status(400).send("Invalid userType.");
      }
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.get("/users/:userUid/trips", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      const users = await getUserTrips(userUid);
      res.json(users);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.get(
    "/users/:userUid/trips/count",
    async (req: Request, res: Response) => {
      try {
        const userUid = req.params.userUid;
        const users = await getUserTripsCount(userUid);
        res.json(users);
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );
};
