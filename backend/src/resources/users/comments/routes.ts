import { Express, Request, Response } from "express";
import { getComments } from "./firestore";

export const startCommentsRoutes = (app: Express) => {
  app.get("/users/:userUid/comments", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      const comments = await getComments(userUid);
      res.json(comments);
    } catch (error) {
      res.status(404).send(error);
    }
  });
};
