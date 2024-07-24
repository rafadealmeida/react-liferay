import axios from "axios";

const username = "test@liferay.com";
const password = "teste";
const authHeader = "Basic " + btoa(username + ":" + password);

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    accept: "application/json",
    Authorization: authHeader,
  },
});
