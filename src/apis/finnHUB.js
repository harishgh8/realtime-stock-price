import axios from "axios";
const TOKEN = "ccgtkj2ad3i4bkk4qkq0";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: { token: TOKEN },
});
