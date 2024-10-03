export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    votes: number;
  }
  
  export interface PostProps {
    post: Post;
  }
  