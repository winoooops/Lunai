import axios from "axios";

export const axiosFactory = (baseURL: string, apiKey: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    }
  });
}