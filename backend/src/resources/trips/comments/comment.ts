export interface CommentSubmission {
  comment: string;
  rating: number;
  title: string;
}

export interface Comment extends CommentSubmission {
  postDate: string;
  tripId: string;
  userUid: string;
}

export const toComment = (
  tripId: string,
  userUid: string,
  commentSubmission: CommentSubmission,
): Comment => ({
  ...commentSubmission,
  tripId,
  userUid,
  postDate: Date.now().toString(),
});
