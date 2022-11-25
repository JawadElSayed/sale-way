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
          : SingleChildScrollView(
              child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 15),
                  child: Column(
                    children: [
                      Container(
                          padding: EdgeInsets.symmetric(vertical: 15),
                          child: Text(
                            branch.name,
                            style: Theme.of(context).textTheme.headline1,
                          )),
                      Container(
                          padding: EdgeInsets.only(bottom: 20),
                          child: Text("${branch.about}",
                              textAlign: TextAlign.left)),
                      Column(
                        children: branch.products!.map<Widget>((product) {
                          return ProductCard(product: product);
                        }).toList(),
                      ),
                    ],
                  )),
            ),
      bottomNavigationBar: Padding(
          padding: EdgeInsets.symmetric(horizontal: 5, vertical: 15),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).accentColor,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                  ),
                  onPressed: () {
                    // Navigator.of(context).pushNamed("/map");
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 13),
                    height: 45,
                    width: 100,
                    alignment: Alignment.center,
                    child: Text("Location",
                        style: TextStyle(color: Colors.white, fontSize: 18)),
                  )),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromRGBO(36, 180, 59, 1),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                  ),
                  onPressed: () {},
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    width: 100,
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: const [
                          // Icon(Icons.whatsapp, color: Colors.white),
                          Text("WhatsApp",
                              style: TextStyle(
                                color: Colors.white,
                              )),
                        ]),
                  ))
            ],
          )),
    );
  }
}
