import 'package:flutter/material.dart';

class SearchBar extends StatelessWidget {
  const SearchBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: TextField(
          onChanged: null,
          cursorColor: Colors.grey,
          decoration: InputDecoration(
            contentPadding: EdgeInsets.only(left: 10),
            fillColor: Colors.white,
            filled: true,
            border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(50),
                borderSide: BorderSide.none),
            hintText: 'Search',
            hintStyle: const TextStyle(color: Colors.grey, fontSize: 18),
          )),
    );
  }
}
