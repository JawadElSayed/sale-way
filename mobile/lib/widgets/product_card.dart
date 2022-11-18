import 'package:flutter/material.dart';
import '../providers/product.provider.dart';
import 'circle_image.dart';

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
                    child: const CircleImage(
                        url:
                            'http://192.168.0.103:3000/static/images/store/default.jpg'),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: Text(product.name)),
                      Text("category")
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                      padding: const EdgeInsets.only(bottom: 10),
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
