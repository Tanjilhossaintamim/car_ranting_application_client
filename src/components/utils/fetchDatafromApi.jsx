import axios from "axios";
import { BASEURL } from "./BaseUrl";

export const fetchDatafromApi = async (endpoint) => {
  try {
    const response = await axios.get(`${BASEURL}/api/${endpoint}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
