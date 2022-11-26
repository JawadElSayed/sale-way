import 'package:flutter/material.dart';
import 'package:mobile/widgets/drop_down_list.dart';
import 'package:mobile/widgets/search_bar.dart';

class TopBar extends StatelessWidget {
  const TopBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 160,
      padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
      decoration: BoxDecoration(color: Theme.of(context).primaryColor),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
        child: Column(children: [
          SearchBar(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              DropDown(list: [
                "category",
                "clothes",
                "phones",
                "laptops",
                "shoes",
                "perfuims",
                "makeups"
              ]),
              DropDown(list: ["distance", "1km", "2km", "3km", "5km", "10km"]),
            ],
          ),
        ]),
      ),
    );
  }
}
