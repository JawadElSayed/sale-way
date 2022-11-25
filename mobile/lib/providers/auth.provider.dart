import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/providers/user.provider.dart';

import '../helpers/http/http.dart';
import '../models/http_exeption.dart';

class Auth with ChangeNotifier {
  late User user;

  User get userGetter {
    return user;
  }

  Future login(data) async {
    try {
      final res = await post("/auth/login", jsonEncode(data));
      final response = jsonDecode(res.body);
      print(response["status"]);
      if (response["status"] == "error") {
        throw HttpException(response["message"]);
      }
      var userData = response["user"];
      late User loadedUser;

      loadedUser = User(
        id: userData["id"],
        name: userData["name"],
        created_at: userData["created_at"],
        updated_at: userData["updated_at"],
        DOB: userData["DOB"],
        email: userData["email"],
        gender: userData["gender"],
        profile: userData["profile"],
      );

      user = loadedUser;
      notifyListeners();
      return response;
    } catch (err) {
      throw err;
    }
  }