import 'package:flutter/material.dart';
import 'package:mobile/providers/branch.provider.dart';
import 'package:mobile/widgets/circle_image.dart';

class BottomModal extends StatelessWidget {
  final Branch data;
  const BottomModal({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 20),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.only(topLeft: Radius.circular(50))),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const CircleImage(
                  url:
                      'http://192.168.0.103:3000/static/images/store/default.jpg'),
              Text(data.name),
            ],
          ),
          Text("Store Type: "),
          Text("Distance: "),
          Text("up to %"),
          Container(
            alignment: Alignment.center,
            child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromRGBO(36, 180, 59, 1),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                ),
                onPressed: () {},
                child: SizedBox(
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
                )),
          )
        ],
      ),
    );
  }
}
