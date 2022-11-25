import { useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_NOTIFICATIONS_KEY = ["ALL_NOTIFICATIONS_KEY"];

const getAllNotifications = async () => {
	return await sale_way.getAPI(`/notification`);
};

export const useAllNotifications = () => {
	return useQuery(ALL_NOTIFICATIONS_KEY, getAllNotifications);
};
