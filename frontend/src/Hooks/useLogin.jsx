import { useMutation } from "react-query";
import { sale_way } from "../utils/axios";

const login = async (data) => {
	return await sale_way.postAPI(`${sale_way.baseURL}/auth/login`, data);
};

export const useLogin = () => {
	return useMutation(login);
};
