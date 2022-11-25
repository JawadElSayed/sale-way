import 'package:flutter/material.dart';
import 'package:mobile/widgets/circle_image.dart';

import '../helpers/config/config.dart';
import '../providers/branches.provider.dart';
import '../widgets/product_card.dart';

class StoreScreen extends StatefulWidget {
  StoreScreen({super.key});

  @override
  State<StoreScreen> createState() => _StoreScreenState();
}

class _StoreScreenState extends State<StoreScreen> {
  bool _isLoading = true;

  var branch;

  @override
  Widget build(BuildContext context) {
    final branch_id = ModalRoute.of(context)?.settings.arguments;

    if (branch == null) {
      getBranch(branch_id).then((b) {
        print(b);
        branch = b;
        _isLoading = false;
        setState(() {});
      });
    }

    return Scaffold(
      appBar: AppBar(
        scrolledUnderElevation: 1,
        toolbarHeight: 150,
        centerTitle: true,
        title: _isLoading
            ? null
            : CircleImage(
                url: '${Config.staticUrl}${branch.image}',
                radius: (AppBar().preferredSize.height).toInt()),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : Container()
    );
  }
}
