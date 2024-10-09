import { Comment } from "../../../types/CommentTypes";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/axios";
import { CommentItem } from "../comment/CommentItem";
import { CommentListProps } from "../../../types/CommentTypes";

const fetchComments = async (postId: string): Promise<Comment[]> => {
  const response = await apiClient.get(`posts/${postId}/comments`);
  return response.data;
};

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      {data?.map((d: Comment) => (
        <CommentItem key={d._id} comment={d} />
      ))}
    </div>
  );
};
