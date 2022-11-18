import 'package:flutter/material.dart';
import 'package:mobile/providers/branch.provider.dart';

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
              Container(
                width: 60,
                height: 60,
                margin: EdgeInsets.only(right: 15),
                decoration: BoxDecoration(
                  color: const Color(0xff7c94b6),
                  image: DecorationImage(
                    image: NetworkImage(
                        'http://192.168.0.103:3000/static/images/store/default.jpg'),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.all(Radius.circular(50.0)),
                  border: Border.all(
                    color: Theme.of(context).accentColor,
                    width: 2.0,
                  ),
                ),
              ),
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
