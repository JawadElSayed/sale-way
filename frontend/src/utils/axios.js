import axios from "axios";
import { baseUrl } from "../config/config";

export const sale_way = {};

const token = localStorage.getItem("token");

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = { Authorization: "token " + token };

sale_way.getAPI = async (api_url) => {
	return await axios(api_url);
};

sale_way.postAPI = async (api_url, api_data) => {
	return await axios.post(api_url, api_data);
};

sale_way.putAPI = async (api_url, api_data) => {
	return await axios.put(api_url, api_data);
};

sale_way.deleteAPI = async (api_url, api_data) => {
	return await axios.delete(api_url, api_data);
};
