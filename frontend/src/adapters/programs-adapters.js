// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/programs';



// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array


export const getAllPrograms = async () => {
  const [programs, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); // print the error for simplicity.
  return programs || [];
};

export const getProgram = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

