import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/helpers/http/http.dart';
import 'product.provider.dart';

class Products with ChangeNotifier {
  List<Product> products = [];

  List<Product> get productGetter {
    return [...products];
  }

  Future getProducts() async {
    try {
      final res = await get("/product/user");
      final extracData = jsonDecode(res.body) as Map;
      final data = extracData["products"];
      List<Product> loadedProducts = [];
      data.forEach((product) {
        loadedProducts.add(Product(
          id: product["id"],
          name: product["name"],
          description: product["description"],
          discount: product["discount"],
          created_at: product["created_at"],
          updated_at: product["updated_at"],
          product_categories: product["product_categories"],
          images: product["images"],
          branches: product["branches"],
        ));
      });
      products = loadedProducts;
      notifyListeners();
    } catch (e) {
      throw (e);
    }
  }
}
