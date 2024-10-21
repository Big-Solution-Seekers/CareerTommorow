// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/fields';



// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array


export const getAllFields = async () => {
  const [fields, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); // print the error for simplicity.
  return fields || [];
};

export const getField = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

