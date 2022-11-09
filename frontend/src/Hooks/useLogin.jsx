import { useMutation } from "react-query";
import { sale_way } from "../utils/axios";

const login = async (data) => {
	return await sale_way.postAPI(`/auth/login`, data);
};

export const useLogin = () => {
	return useMutation(login);
};
