import 'package:flutter/material.dart';

class DropDown extends StatefulWidget {
  DropDown({super.key});

  @override
  State<DropDown> createState() => _DropDownState();
}

class _DropDownState extends State<DropDown> {
  List list = ["one", "two", "three", "four", "five", "six"];

  var dropdownValue = "one";
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Theme.of(context).accentColor,
        borderRadius: BorderRadius.circular(50),
      ),
      child: DropdownButton<String>(
        value: dropdownValue,
        icon: const Icon(Icons.arrow_drop_down_outlined, size: 30),
        style: const TextStyle(color: Colors.deepPurple),
        items: list.map<DropdownMenuItem<String>>((e) {
          return DropdownMenuItem(
            value: e,
            child: Text(e),
          );
        }).toList(),
        onChanged: (value) {
          setState(() {
            dropdownValue = value!;
          });
        },
      ),
    );
  }
}
