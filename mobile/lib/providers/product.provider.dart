import 'package:flutter/material.dart';

class Product with ChangeNotifier {
  final int id;
  final String name;
  final String description;
  final int discount;
  final String created_at;
  final String updated_at;
  final List product_categories;
  final List images;
  final List? branches;
  final double? distance;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.discount,
    required this.created_at,
    required this.updated_at,
    required this.product_categories,
    required this.images,
    this.branches,
    this.distance,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      discount: json["discount"],
      description: json['description'],
      created_at: json['created_at'],
      updated_at: json['updated_at'],
      product_categories: json['product_categories'],
      images: json['images'],
      branches: json['branches'],
    );
  }
}
