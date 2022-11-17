import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/helpers/http/http.dart';

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
        ));
      });
      branches = loadedBranches;
      notifyListeners();
    } catch (e) {
      throw (e);
    }
  }
}
