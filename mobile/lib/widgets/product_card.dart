import 'package:flutter/material.dart';
import '../providers/product.provider.dart';

class ProductCard extends StatelessWidget {
  final Product product;
  const ProductCard({required this.product, super.key});

  void selectProduct(BuildContext ctx) {
    Navigator.of(ctx).pushNamed("/product", arguments: product);
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => selectProduct(context),
      child: Card(
        elevation: 0,
        child: Container(
          padding: const EdgeInsets.fromLTRB(20, 10, 40, 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                      padding: EdgeInsets.only(right: 20),
                      child: Text("image")),
                  Column(
                    children: [
                      Container(
                          padding: EdgeInsets.only(bottom: 10),
                          child: Text(product.name)),
                      Text("category")
                    ],
                  ),
                ],
              ),
              Column(
                children: [
                  Container(
                      padding: EdgeInsets.only(bottom: 10),
                      child: Text("discount")),
                  Text("distance")
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
