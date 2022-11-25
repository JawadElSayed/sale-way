import { useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_STORES_KEY = ["ALL_STORE_KEY"];

const getAllStores = async () => {
	return await sale_way.getAPI(`/store`);
};

export const useAllStores = () => {
	return useQuery(ALL_STORES_KEY, getAllStores);
};
