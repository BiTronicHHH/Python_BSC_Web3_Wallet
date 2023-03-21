import axios from "axios";

// export const baseURL = "http://localhost:5000/";
// export const baseURL = "https://qstn-backend-v1.herokuapp.com/";
export const baseURL = "http://192.168.124.8:5000/";

const api = axios.create({
  baseURL: baseURL + "api",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiFile = axios.create({
  baseURL: baseURL + "api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const SECRET_KEY =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxMmFkQjZEOEE4QjU3MmQ3Mzg4QjA2MzA1MjBlQTVEMTdFYjRFOEYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTI0Mjg2OTYyMiwibmFtZSI6Ik9yaW4ifQ.0bBt3WzDzuE_GBXd2cJ7WIJMDYYMOs2KR16s4G_RdX0";

const nftApi = axios.create({
  baseURL: "https://api.nft.storage",
  headers: {
    Authorization: SECRET_KEY,
    "Content-Type": "image/*",
  },
});
const configuration = {
  api,
  apiFile,
  nftApi,
};

export default configuration;
