import axios from "axios";

export const sale_way = {};

sale_way.baseURL = "http://127.0.0.1:3000";

sale_way.getAPI = async (api_url) => {
	return await axios(api_url);
};

sale_way.postAPI = async (api_url, api_data, api_token = null) => {
	return await axios.post(api_url, api_data, {
		headers: {
			Authorization: "token " + api_token,
		},
	});
};
