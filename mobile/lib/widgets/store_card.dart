import 'package:flutter/material.dart';
import 'package:mobile/helpers/config/config.dart';
import 'package:mobile/providers/branch.provider.dart';

import 'circle_image.dart';

class StoreCard extends StatelessWidget {
  final Branch branch;
  const StoreCard({required this.branch, super.key});

  void selectStore(BuildContext ctx) {
    Navigator.of(ctx).pushNamed("/store", arguments: branch.id);
  }

  @override
  Widget build(BuildContext context) {
    String category = branch.store_type[0]["categories"]["category"];
    return InkWell(
      onTap: () => selectStore(context),
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
                        url: '${Config.staticUrl}${branch.image}', radius: 30),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                          padding: EdgeInsets.only(bottom: 10),
                          child: Text(
                            branch.name,
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
                      padding: EdgeInsets.only(bottom: 10),
                      child: Text("up to ${branch.products![0].discount}%")),
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
