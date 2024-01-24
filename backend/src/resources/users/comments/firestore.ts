import { collection, getDocs, query, where } from "firebase/firestore";
import firestore from "../../../firestore/firestore";
import { Comment } from "../../trips/comments/comment";
import { getTripById } from "../../trips/firestore";

export const getComments = async (userUid: string): Promise<Comment[]> => {
  const commentDocuments = await getDocs(
    query(collection(firestore, "comment"), where("userUid", "==", userUid)),
  );

  const userComments: Comment[] = commentDocuments.docs.map(
    (commentDocument) => commentDocument.data() as Comment,
  );

  // Collects comments that are on an existing trip.
  const commentsOnExistingTrips: Comment[] = [];
  await Promise.all(
    userComments.map((comment) =>
      getTripById(comment.tripId).then((trip) => {
        if (trip !== null) {
          commentsOnExistingTrips.push(comment);
        }
      }),
    ),
  );

  return commentsOnExistingTrips;
};
