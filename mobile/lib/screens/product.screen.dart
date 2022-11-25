import 'package:flutter/material.dart';
import 'package:mobile/widgets/circle_image.dart';
import '../helpers/config/config.dart';
import '../providers/products.provider.dart';

class ProductScreen extends StatefulWidget {
  ProductScreen({super.key});

  @override
  State<ProductScreen> createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  bool isLoading = true;
  var product;

  void selectStore(BuildContext ctx) {
    Navigator.of(ctx).pushNamed("/store", arguments: product.branches[0]["id"]);
  }

  @override
  Widget build(BuildContext context) {
    var product_id = ModalRoute.of(context)?.settings.arguments;

    if (product == null) {
      getProduct(product_id).then((p) {
        product = p;
        isLoading = false;
        setState(() {});
      });
    }

    return Scaffold(
      appBar: AppBar(backgroundColor: Theme.of(context).primaryColor),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Container(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        height: 330,
                        decoration: BoxDecoration(color: Colors.grey[200]),
                        child: Container(
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: NetworkImage(
                                  'http://${Config.staticUrl}${product.images[0]["image"]}'),
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                      ),
                      Container(
                        padding:
                            const EdgeInsets.only(left: 30, top: 30, right: 30),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                                padding: const EdgeInsets.only(bottom: 10),
                                child: Text(
                                  product.name,
                                  style: Theme.of(context).textTheme.headline1,
                                )),
                            Padding(
                                padding: const EdgeInsets.only(bottom: 30),
                                child: Text(product.description)),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 20),
                              child: Row(
                                children: [
                                  InkWell(
                                    onTap: () => selectStore(context),
                                    child: CircleImage(
                                        url:
                                            '${Config.staticUrl}${product.branches[0]["image"]}',
                                        radius: 30),
                                  ),
                                  InkWell(
                                    onTap: () => selectStore(context),
                                    child: Text(
                                      product.branches[0]["name"],
                                      style:
                                          Theme.of(context).textTheme.headline3,
                                    ),
                                  )
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 20),
                              child: Text("Discount: ${product.discount}%"),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 20),
                              child: Text("Distance: 1Km"),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 25),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: [
                                  ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor:
                                            Theme.of(context).accentColor,
                                        shape: RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                      ),
                                      onPressed: () {
                                        Navigator.of(context).pushNamed("/map");
                                      },
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 13),
                                        width: 100,
                                        alignment: Alignment.center,
                                        child: Text("Location",
                                            style:
                                                TextStyle(color: Colors.white)),
                                      )),
                                  ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color.fromRGBO(
                                            36, 180, 59, 1),
                                        shape: RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                      ),
                                      onPressed: () {},
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 13),
                                        width: 100,
                                        child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceAround,
                                            children: const [
                                              // Icon(Icons.whatsapp,
                                              //     color: Colors.white),
                                              Text("WhatsApp",
                                                  style: TextStyle(
                                                    color: Colors.white,
                                                  )),
                                            ]),
                                      ))
                                ],
                              ),
                            )
                          ],
                        ),
                      )
                    ]),
              ),
            ),
    );
  }
}
