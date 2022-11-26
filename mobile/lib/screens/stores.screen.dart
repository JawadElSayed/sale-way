import 'package:flutter/material.dart';
import 'package:mobile/widgets/store_card.dart';
import 'package:mobile/widgets/top_bar.dart';
import 'package:provider/provider.dart';

import '../providers/branches.provider.dart';

class StoresScreen extends StatelessWidget {
  const StoresScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List branches = Provider.of<Branches>(context).branchesGetter;

    return Container(
      child: Column(
        children: [
          Container(child: TopBar()),
          Container(
            height: MediaQuery.of(context).size.height * 0.92 -160,
            padding: EdgeInsets.symmetric(horizontal: 10),
            child: ListView(
              children: branches.map((branch) {
                return StoreCard(branch: branch);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
