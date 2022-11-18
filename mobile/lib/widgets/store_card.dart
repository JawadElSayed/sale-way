import 'package:flutter/material.dart';
import 'package:mobile/providers/branch.provider.dart';

import 'circle_image.dart';

class StoreCard extends StatelessWidget {
  final Branch branch;
  const StoreCard({required this.branch, super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
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
                        padding: EdgeInsets.only(bottom: 10),
                        child: Text(branch.name)),
                    Text("category")
                  ],
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
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
    );
  }
}
