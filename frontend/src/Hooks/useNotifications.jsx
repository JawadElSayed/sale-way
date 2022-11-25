import { useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_NOTIFICATIONS_KEY = ["ALL_NOTIFICATIONS_KEY"];
export const NUMBERS_CLICKS_KEY = ["NUMBERS_CLICKS_KEY"];
export const BEST_USERS_KEY = ["BEST_USERS_KEY"];
export const BEST_BRANCHS_KEY = ["BEST_BRANCHS_KEY"];

const getAllNotifications = async () => {
	return await sale_way.getAPI(`/notification`);
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
