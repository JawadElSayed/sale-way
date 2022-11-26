import 'package:flutter/material.dart';

class CircleImage extends StatelessWidget {
  final url;
  int radius = 30;
  CircleImage({super.key, this.url, required this.radius});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: radius * 2,
      height: radius * 2,
      margin: const EdgeInsets.only(right: 15),
      decoration: BoxDecoration(
        color: const Color(0xff7c94b6),
        image: DecorationImage(
          image: NetworkImage("http://$url"),
          fit: BoxFit.cover,
        ),
        borderRadius: const BorderRadius.all(Radius.circular(100.0)),
        border: Border.all(
          color: Theme.of(context).accentColor,
          width: 2.0,
        ),
      ),
    );
  }
}
