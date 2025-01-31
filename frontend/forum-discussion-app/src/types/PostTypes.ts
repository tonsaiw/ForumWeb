  export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdBy: string;
    created_at: string;
    last_updated_at: string,
  }
  
  export interface PostProps {
    post: Post;
    
  }
  
  export interface PostDetailProps {
    title: string;
    content: string;
    author: string;
    date: string;
    postId: string;
    onEditClick: () => void;
  }