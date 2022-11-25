import 'package:flutter/material.dart';
import '../helpers/config/config.dart';
import '../providers/product.provider.dart';
import 'circle_image.dart';

class ProductCard extends StatelessWidget {
  final Product product;
  const ProductCard({required this.product, super.key});

  void selectProduct(BuildContext ctx) {
    Navigator.of(ctx).pushNamed("/product", arguments: product.id);
  }

  @override
  Widget build(BuildContext context) {
    String category = product.product_categories[0]["categories"]["category"];
    return InkWell(
      onTap: () => selectProduct(context),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        margin: EdgeInsets.symmetric(vertical: 4),
        elevation: 2.5,
        child: Container(
          padding: const EdgeInsets.fromLTRB(20, 10, 40, 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    child: CircleImage(
                      url: '${Config.staticUrl}${product.images[0]["image"]}',
                      radius: 30,
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: Text(
                            product.name,
                            style: Theme.of(context).textTheme.headline3,
                          )),
                      Text(
                          "${category[0].toUpperCase()}${category.substring(1)} ")
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: Text("up to ${product.discount}%")),
                  Text("1Km")
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
