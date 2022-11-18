import 'package:flutter/material.dart';
import 'package:mobile/widgets/circle_image.dart';
import '../providers/product.provider.dart';

class ProductScreen extends StatelessWidget {
  ProductScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final product = ModalRoute.of(context)?.settings.arguments as Product;
    return Scaffold(
      appBar: AppBar(backgroundColor: Theme.of(context).primaryColor),
      body: Container(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            height: 330,
            decoration: BoxDecoration(
              color: const Color(0xff7c94b6),
              image: DecorationImage(
                image: NetworkImage(
                    'http://192.168.0.103:3000/static/images/store/default.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.only(left: 30, top: 30, right: 30),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Text(product.name)),
                Padding(
                    padding: const EdgeInsets.only(bottom: 30),
                    child: Text(product.description)),
                Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: Row(
                    children: [
                      const CircleImage(
                          url:
                              'http://192.168.0.103:3000/static/images/store/default.jpg'),
                      Text(product.name),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: Text("Discount: ${product.discount}%"),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: Text("Distance: Km"),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Theme.of(context).accentColor,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {},
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 13),
                          width: 100,
                          alignment: Alignment.center,
                          child: Text("Location",
                              style: TextStyle(color: Colors.white)),
                        )),
                    ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromRGBO(36, 180, 59, 1),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {},
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 9),
                          width: 100,
                          child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: const [
                                Icon(Icons.whatsapp, color: Colors.white),
                                Text("WhatsApp",
                                    style: TextStyle(
                                      color: Colors.white,
                                    )),
                              ]),
                        ))
                  ],
                )
              ],
            ),
          )
        ]),
      ),
    );
  }
}
