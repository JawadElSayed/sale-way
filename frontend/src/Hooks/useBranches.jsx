import { useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_STORES_KEY = ["ALL_BRANCHES_KEY"];
export const buildBranchById = (id) => ["BRANCH_BY_ID", id];

const getAllBranches = async () => {
	return await sale_way.getAPI(`/branch`);
};

const getBranchByID = async (id) => {
	return await sale_way.getAPI(`/branch/${id}`);
};

export const useAllBranches = () => {
	return useQuery(ALL_STORES_KEY, getAllBranches);
};

export const useBranchByID = (id) => {
	return useQuery({
		queryKey: buildBranchById(id),
		queryFn: () => getBranchByID(id),
	});
};
