import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/helpers/http/http.dart';
import 'package:mobile/providers/products.provider.dart';
import '../models/http_exeption.dart' as exception;

import 'branch.provider.dart';

class Branches with ChangeNotifier {
  List<Branch> branches = [];

  List<Branch> get branchesGetter {
    return [...branches];
  }

  Future getBranches() async {
    try {
      final res = await get("/branch");
      final extracData = jsonDecode(res.body) as Map;
      if (extracData["status"] == "error")
        throw exception.HttpException(extracData["message"]);
      final data = extracData["branches"];
      List<Branch> loadedBranches = [];
      data.forEach((branch) {
        loadedBranches.add(Branch(
          id: branch["id"],
          store_id: branch["store_id"],
          name: branch["name"],
          about: branch["about"],
          image: branch["image"],
          latitude: branch["latitude"],
          longitude: branch["longitude"],
          phone: branch["phone"],
          last_notification: branch["last_notification"],
          store_type: branch["store_types"],
          products: returnListProducts(branch["products"]),
        ));
      });
      branches = loadedBranches;
      notifyListeners();
    } catch (e) {
      throw (e);
    }
  }
}

Future<Branch> getBranch(id) async {
  try {
    final res = await get("/branch/$id");
    final extracData = jsonDecode(res.body) as Map;
    final data = extracData["branch"];
    // print(data);
    Branch branch = Branch(
        id: data["id"],
        name: data["name"],
        about: data["about"],
        image: data["image"],
        last_notification: data["last_notification"],
        latitude: data["latitude"],
        longitude: data["longitude"],
        phone: data["phone"],
        store_id: data["store_id"],
        store_type: data["store_types"],
        products: returnListProducts(data["products"]));
    return branch;
  } catch (e) {
    throw (e);
  }
}
