import { useMutation, useQuery } from "react-query";
import { sale_way } from "../utils/axios";

export const ALL_PRODUCTS_KEY = ["ALL_PRODUCTS_KEY"];

const getAllProducts = async () => {
	return await sale_way.getAPI(`/product`);
};

const saveProduct = async (data) => {
	return await sale_way.postAPI("/product", data);
};

const deleteProduct = async (id) => {
	return await sale_way.deleteAPI(`/product/${id}`);
};

export const useAllProducts = () => {
	return useQuery(ALL_PRODUCTS_KEY, getAllProducts);
};

export const useAddProduct = () => {
	return useMutation(saveProduct);
};

export const useDeleteProduct = (id) => {
	return useMutation((id) => {
		deleteProduct(id);
	});
};
