import 'package:flutter/material.dart';
import 'package:mobile/providers/branch.provider.dart';

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
                    padding: EdgeInsets.only(right: 20), child: Text("image")),
                Column(
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
