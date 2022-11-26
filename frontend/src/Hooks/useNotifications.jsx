import { useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_NOTIFICATIONS_KEY = ["ALL_NOTIFICATIONS_KEY"];
export const NUMBERS_CLICKS_KEY = ["NUMBERS_CLICKS_KEY"];
export const BEST_USERS_KEY = ["BEST_USERS_KEY"];
export const BEST_BRANCHS_KEY = ["BEST_BRANCHS_KEY"];
export const BRANCH_ANALYTICS_KEY = ["BRANCH_ANALYTICS_KEY"];
export const buildBranchAnalyticsById = (id) => ["BRANCH_ANALYTICS_BY_ID", id];

const getAllNotifications = async () => {
	return await sale_way.getAPI(`/notification`);
};

const getBranchAnalyticsBYID = async (id) => {
	return await sale_way.getAPI(`/notification/${id}`);
};

const getBranchAnalytics = async () => {
	return await sale_way.getAPI(`/notification/branch`);
};

const getNmberClicks = async () => {
	return await sale_way.getAPI(`/notification/clicks`);
};

const getBestUsers = async () => {
	return await sale_way.getAPI(`/notification/best-user`);
};

const getBestBranches = async () => {
	return await sale_way.getAPI(`/notification/best-branch`);
};

export const useAllNotifications = () => {
	return useQuery(ALL_NOTIFICATIONS_KEY, getAllNotifications);
};

export const useNumberClicks = () => {
	return useQuery(NUMBERS_CLICKS_KEY, getNmberClicks);
};

export const useBestUsers = () => {
	return useQuery(BEST_USERS_KEY, getBestUsers);
};

export const useBestBranches = () => {
	return useQuery(BEST_BRANCHS_KEY, getBestBranches);
};

export const useBranchAnalytics = () => {
	return useQuery(BRANCH_ANALYTICS_KEY, getBranchAnalytics);
};

export const useBranchAnalyticsBYID = (id) => {
	return useQuery({
		queryKey: buildBranchAnalyticsById(id),
		queryFn: () => getBranchAnalyticsBYID(id),
	});
};
