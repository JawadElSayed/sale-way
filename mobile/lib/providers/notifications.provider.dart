import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/helpers/http/http.dart';
import '../models/http_exeption.dart';

import './notification.provider.dart' as n;

class Notifications with ChangeNotifier {
  List<n.Notification> notifications = [];

  List<n.Notification> get notificationsGetter {
    return [...notifications];
  }

  Future getNotifications() async {
    try {
      final res = await get("/notification/user");
      final extracData = jsonDecode(res.body) as Map;
      // print("data: $extracData");
      final data = extracData["notifications"];
      List<n.Notification> loadedNotifications = [];
      data.forEach((notification) {
        loadedNotifications.add(n.Notification(
            user_id: notification["user_id"],
            branch_id: notification["branch_id"],
            title: notification["title"],
            message: notification["message"],
            created_at: notification["created_at"],
            clicked: notification["clicked"],
            deleted: notification["deleted"],
            cliked_at: notification["clicked_at"],
            firebase_id: notification["firebase_id"],
            branches: notification["branches"]));
      });
      notifications = loadedNotifications;
      notifyListeners();
    } catch (e) {
      throw (e);
    }
  }
}
