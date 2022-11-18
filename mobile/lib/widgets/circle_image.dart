import 'package:flutter/material.dart';

class CircleImage extends StatelessWidget {
  final url;
  const CircleImage({super.key, this.url});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      margin: const EdgeInsets.only(right: 15),
      decoration: BoxDecoration(
        color: const Color(0xff7c94b6),
        image: DecorationImage(
          image: NetworkImage(url),
          fit: BoxFit.cover,
        ),
        borderRadius: const BorderRadius.all(Radius.circular(50.0)),
        border: Border.all(
          color: Theme.of(context).accentColor,
          width: 2.0,
        ),
      ),
    );
  }
}
