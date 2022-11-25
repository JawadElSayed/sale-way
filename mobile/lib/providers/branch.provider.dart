import 'package:flutter/material.dart';
import 'package:mobile/providers/product.provider.dart';

class Branch with ChangeNotifier {
  final int id;
  final int store_id;
  final String name;
  final String phone;
  final String about;
  final String longitude;
  final String latitude;
  final String image;
  final String last_notification;
  final List store_type;
  final List<Product>? products;
  late double? distance;

  Branch(
      {required this.id,
      required this.store_id,
      required this.name,
      required this.phone,
      required this.about,
      required this.longitude,
      required this.latitude,
      required this.image,
      required this.last_notification,
      required this.store_type,
      this.products,
      this.distance});

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
      last_notification: json['last_notification'],
      store_type: json['store_type'],
      products: json['products'],
    );
  }
}
