import 'package:flutter/material.dart';

class Notification with ChangeNotifier {
  final int user_id;
  final int branch_id;
  final String title;
  final String message;
  final String created_at;
  bool clicked;
  bool deleted;
  final String? cliked_at;
  final String firebase_id;
  final Map branches;

  Notification(
      {required this.user_id,
      required this.branch_id,
      required this.title,
      required this.message,
      required this.created_at,
      required this.clicked,
      required this.deleted,
      this.cliked_at,
      required this.firebase_id,
      required this.branches});

  factory Notification.fromJson(Map<String, dynamic> json) {
    return Notification(
      user_id: json['user_id'],
      branch_id: json['branch_id'],
      title: json['title'],
      message: json['message'],
      created_at: json['created_at'],
      clicked: json['clicked'],
      deleted: json['deleted'],
      cliked_at: json['cliked_at'],
      firebase_id: json['firebase_id'],
      branches: json['branches'],
    );
  }
}
