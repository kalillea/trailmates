import { del, get, put } from "../utils/fetchMethods";
import { Comment, CommentSubmission } from "./comment";

export const getComment = (tripId: string, userUid: string): Promise<Comment> =>
  get(`trips/${tripId}/comments/${userUid}`);

export const getCommentsOnTrip = (tripId: string): Promise<Comment[]> =>
  get(`trips/${tripId}/comments`);

export const getCommentsByUser = (userUid: string): Promise<Comment[]> =>
  get(`users/${userUid}/comments`);

export const putComment = (
  tripId: string,
  userUid: string,
  commentSubmission: CommentSubmission,
): Promise<Comment> =>
  put(`trips/${tripId}/comments/${userUid}`, commentSubmission);

export const deleteComment = (tripId: string, userUid: string) =>
  del(`trips/${tripId}/comments/${userUid}`);
