import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = "/api/posts";

export const createPost = async ({ title, content }) =>
  fetchHandler(baseUrl, getPostOptions({ title, content }));

export const getAllPosts = async () => {
  const [posts] = await fetchHandler(baseUrl);
  return posts || [];
};

export const getPost = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updatePost = async ({ content }) =>
  fetchHandler(`${baseUrl}/${postId}`, getPatchOptions({ content }));