import { useMutation, useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_STORES_KEY = ["ALL_BRANCHES_KEY"];
export const buildBranchById = (id) => ["BRANCH_BY_ID", id];

const getAllBranches = async () => {
	return await sale_way.getAPI(`/branch`);
};

const AddBranch = async (data) => {
	return await sale_way.postAPI("/branch", data);
};

const getBranchByID = async (id) => {
	return await sale_way.getAPI(`/branch/${id}`);
};

const editBranch = async (data) => {
	return await sale_way.putAPI(`/branch`);
};

const deleteBranch = async (id) => {
	return await sale_way.deleteAPI(`/branch/${id}`);
};

export const useAllBranches = () => {
	return useQuery(ALL_STORES_KEY, getAllBranches);
};

export const useAddBranch = () => {
	return useMutation(AddBranch);
};

export const useBranchByID = (id) => {
	return useQuery({
		queryKey: buildBranchById(id),
		queryFn: () => getBranchByID(id),
	});
};

export const useEditBranch = () => {
	return useMutation(editBranch);
};

export const useDeleteBranch = (id) => {
	return useMutation((id) => {
		deleteBranch(id);
	});
};
