import 'package:flutter/material.dart';
import 'package:mobile/providers/branch.provider.dart';

class BottomModal extends StatelessWidget {
  final Branch data;
  const BottomModal({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text("image"),
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
