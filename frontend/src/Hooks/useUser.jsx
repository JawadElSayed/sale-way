import { useMutation, useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_USER_KEY = ["ALL_USER_KEY"];

const getAllUsers = async () => {
	return await sale_way.getAPI(`/user`);
};

const AddUser = async (data) => {
	return await sale_way.postAPI("/user", data);
};

export const useAllUsers = () => {
	return useQuery(ALL_USER_KEY, getAllUsers);
};

export const useAddUser = () => {
	return useMutation(AddUser);
};
