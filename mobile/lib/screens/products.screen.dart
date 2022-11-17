import 'package:flutter/material.dart';
import '../widgets/product_card.dart';
import '../providers/products.provider.dart';
import 'package:provider/provider.dart';
import '../widgets/top_bar.dart';

class ProductsScreen extends StatelessWidget {
  const ProductsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List products = Provider.of<Products>(context).productGetter;
    return Container(
      child: Column(
        children: [
          Container(child: TopBar()),
          Container(
            height: 500,
            child: ListView(
              children: products.map((product) {
                return ProductCard(product: product);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
