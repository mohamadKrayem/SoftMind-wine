import axios_lib from "../lib/axios.js";

async function fetchData(endpoint = "") {
  const response = await axios_lib.get(endpoint)
  return response.data
}

export default fetchData;


