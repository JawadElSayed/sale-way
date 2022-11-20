import axios from "axios";

export const sale_way = {};

const token = localStorage.getItem("token");

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.headers = { Authorization: "token " + token };

sale_way.getAPI = async (api_url) => {
	return await axios(api_url);
};

sale_way.postAPI = async (api_url, api_data) => {
	return await axios.post(api_url, api_data);
};
