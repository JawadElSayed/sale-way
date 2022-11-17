import 'package:flutter/material.dart';
import 'package:mobile/widgets/drop_down_list.dart';
import 'package:mobile/widgets/search_bar.dart';

class TopBar extends StatelessWidget {
  const TopBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Theme.of(context).primaryColor),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
        child: Column(children: [
          SearchBar(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              DropDown(),
              DropDown(),
            ],
          ),
        ]),
      ),
    );
  }
}
