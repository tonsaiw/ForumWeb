import apiClient from "@/app/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
interface CommentFormProps {
  postId: string;
  commentId: string;
  onClose: () => void;
}

interface EditComment {
  message: string;
}

const editComment = async (
  postId: string,
  commentId: string,
  editPostData: EditComment
) => {
  const response = await apiClient.patch(
    `/posts/${postId}/comments/${commentId}`,
    editPostData
  );
  return response.data;
};

const deleteComment = async (postId: string, commentId: string) => {
  const response = await apiClient.delete(
    `/posts/${postId}/comments/${commentId}`
  );
  return response.data;
};

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  commentId,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const editMutation = useMutation({
    mutationFn: (editCommentData: EditComment) =>
      editComment(postId, commentId, editCommentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      onClose();
    },
    onError: () => {
      setError("Post creation failed. Please check your inputs and try again.");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("message", message);
    editMutation.mutate({ message });
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(postId, commentId), // Calls deletePost with postId
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] }); // Invalidate post list
      onClose(); // Close the form after deletion
    },
    onError: () => {
      setError("Post deletion failed. Please try again.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(); // Trigger delete mutation
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-white bg-opacity-30 backdrop-blur-md"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit or Delete Comment
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                onClick={onClose}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="description"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleDelete}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
