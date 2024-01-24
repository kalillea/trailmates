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
