import { useMutation, useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_STORES_KEY = ["ALL_STORE_KEY"];

const getAllStores = async () => {
	return await sale_way.getAPI(`/store`);
};

const AddStore = async (data) => {
	return await sale_way.postAPI("/store", data);
};

export const useAllStores = () => {
	return useQuery(ALL_STORES_KEY, getAllStores);
};

export const useAddStore = () => {
	return useMutation(AddStore);
};
