export interface Comment {
    _id: string;
    message: string;
    author: string;
    postId: string;
    createdBy: string;
    created_at: string;
    last_updated_at: string,
  }

export interface CommentListProps {
    postId: string;
  }

export interface CommentProps {
    comment: Comment;
}
