import axios from "axios";

export default axios.create({
  baseURL: "https://api.sampleapis.com/wines",
  //baseURL: "https://jsonplaceholder.typicode.com/todos/1",
});

