import 'package:flutter/material.dart';

class Branch with ChangeNotifier {
  final int id;
  final int store_id;
  final String name;
  final String phone;
  final String about;
  final String longitude;
  final String latitude;
  final String image;

  Branch({
    required this.id,
    required this.store_id,
    required this.name,
    required this.phone,
    required this.about,
    required this.longitude,
    required this.latitude,
    required this.image,
  });

  factory Branch.fromJson(Map<String, dynamic> json) {
    return Branch(
      id: json['id'],
      store_id: json['store_id'],
      name: json['name'],
      phone: json['phone'],
      about: json['about'],
      longitude: json['longitude'],
      latitude: json['latitude'],
      image: json['image'],
    );
  }
}
