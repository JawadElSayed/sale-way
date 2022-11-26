import 'package:flutter/material.dart';

class User with ChangeNotifier {
  final int id;
  final String name;
  final String created_at;
  final String updated_at;
  final String profile;
  final String email;
  final String gender;
  final String DOB;

  User(
      {required this.id,
      required this.name,
      required this.created_at,
      required this.updated_at,
      required this.profile,
      required this.email,
      required this.gender,
      required this.DOB});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      created_at: json['created_at'],
      updated_at: json['updated_at'],
      DOB: json['updated_at'],
      email: json['email'],
      gender: json['gender'],
      profile: json['profile'],
    );
  }
}
