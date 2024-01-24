import { Express, Request, Response } from "express";
import {
  deleteComment,
  getComment,
  getComments,
  putComment,
} from "./firestore";

export const startCommentsRoutes = (app: Express) => {
  app.get("/trips/:tripId/comments", async (req: Request, res: Response) => {
    try {
      const tripId = req.params.tripId;
      const comments = await getComments(tripId);
      res.json(comments);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.get(
    "/trips/:tripId/comments/:userUid",
    async (req: Request, res: Response) => {
      try {
        const tripId = req.params.tripId;
        const userUid = req.params.userUid;
        const comment = await getComment(tripId, userUid);
        if (comment) {
          res.json(comment);
        } else {
          res.status(404).send("Comment not found.");
        }
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );

  app.put(
    "/trips/:tripId/comments/:userUid",
    async (req: Request, res: Response) => {
      try {
        const tripId = req.params.tripId;
        const userUid = req.params.userUid;
        const commentSubmission = req.body;
        const comment = await putComment(tripId, userUid, commentSubmission);
        res.json(comment);
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );

  app.delete(
    "/trips/:tripId/comments/:userUid",
    async (req: Request, res: Response) => {
      try {
        const tripId = req.params.tripId;
        const userUid = req.params.userUid;
        await deleteComment(tripId, userUid);
        res.json({ message: "OK" });
      } catch (error) {
        res.status(404).send(error);
      }
    },
  );
};
