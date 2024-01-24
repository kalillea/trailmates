import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import firestore from "../../../firestore/firestore";
import { Comment, CommentSubmission, toComment } from "./comment";

export const getComments = async (tripId: string): Promise<Comment[]> => {
  // You shouldn't receive comments on non-existent trip.
  const tripDocument = await getDoc(doc(firestore, "trip", tripId));
  if (!tripDocument.exists()) return [];

  const commentDocuments = await getDocs(
    query(collection(firestore, "comment"), where("tripId", "==", tripId)),
  );

  return commentDocuments.docs.map(
    (commentDocument) => commentDocument.data() as Comment,
  );
};

const commentQuery = (tripId: string, userUid: string) =>
  query(
    collection(firestore, "comment"),
    where("tripId", "==", tripId),
    where("userUid", "==", userUid),
  );

export const getComment = async (
  tripId: string,
  userUid: string,
): Promise<Comment | null> => {
  const commentDocuments = await getDocs(commentQuery(tripId, userUid));

  if (commentDocuments.empty) {
    return null;
  }

  return commentDocuments.docs.map(
    (commentDocument) => commentDocument.data() as Comment,
  )[0];
};

export const putComment = async (
  tripId: string,
  userUid: string,
  commentSubmission: CommentSubmission,
): Promise<Comment> => {
  const commentDocuments = await getDocs(commentQuery(tripId, userUid));

  // New comment
  if (commentDocuments.empty) {
    const comment = toComment(tripId, userUid, commentSubmission);
    await addDoc(collection(firestore, "comment"), comment);
    return comment;
  }

  // Overriding existing comment
  const commentDocument = commentDocuments.docs[0];
  const commentId = commentDocument.id;
  await setDoc(doc(firestore, "comment", commentId), commentSubmission, {
    merge: true,
  });
  const changedCommentDocument = await getDoc(
    doc(firestore, "comment", commentId),
  );
  return changedCommentDocument.data() as Comment;
};

export const deleteComment = async (tripId: string, userUid: string) => {
  const commentDocuments = await getDocs(commentQuery(tripId, userUid));
  commentDocuments.forEach((commentDocument) => deleteDoc(commentDocument.ref));
};

export const getAverageRating = async (tripId: string): Promise<number> => {
  const comments = await getComments(tripId);
  if (comments.length === 0) return 0;
  const totalRating = comments
    .map((comment) => comment.rating)
    .reduce((a, b) => a + b);
  return totalRating / comments.length;
};

export const getRatingCount = async (tripId: string): Promise<number> => {
  const ratingCountDocument = await getCountFromServer(
    query(collection(firestore, "comment"), where("tripId", "==", tripId)),
  );
  return ratingCountDocument.data().count;
};
