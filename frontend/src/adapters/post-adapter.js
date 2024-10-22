import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const createPost = async ({ title, content }) =>
  fetchHandler(baseUrl, getPostOptions({ title, content }));

export const getAllPosts = async () => {
  const [posts] = await fetchHandler(baseUrl);
  return posts || [];
};

export const getPost = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updatePost = async (postId, { content }) =>
  fetchHandler(`${baseUrl}/${postId}`, getPatchOptions({ content }));

// New deletePost function
export const deletePost = async (postId) => {
  const [response, error] = await fetchHandler(`${baseUrl}/${postId}`, deleteOptions);
  if (error) {
    console.error("Error deleting post:", error);
    throw error; // Rethrow error if needed
  }
  return response; // Assuming the response is the deleted post or a success message
};
