import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = "/api/comments";

export const createComment = async ({ content }) =>
  fetchHandler(baseUrl, getPostOptions({ content }));

export const getAllComments = async (id) => {
  const [comments] = await fetchHandler(`/api/posts/${id}/comments`);
  return comments || [];
};

export const getComment = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateComment = async ({ content }) =>
  fetchHandler(`${baseUrl}/${commentId}`, getPatchOptions({ content }));