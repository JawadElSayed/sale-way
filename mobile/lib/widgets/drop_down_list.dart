import 'package:flutter/material.dart';

class DropDown extends StatefulWidget {
  List list;
  DropDown({required this.list, super.key});

  @override
  State<DropDown> createState() => _DropDownState(dropdownValue: list.first);
}

class _DropDownState extends State<DropDown> {
  var dropdownValue;
  _DropDownState({this.dropdownValue});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      width: 140,
      padding: EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Theme.of(context).accentColor,
        borderRadius: BorderRadius.circular(50),
      ),
      child: DropdownButton<String>(
        isExpanded: true,
        value: dropdownValue,
        icon: const Icon(Icons.arrow_drop_down_outlined, size: 30),
        style: const TextStyle(color: Colors.deepPurple),
        items: widget.list.map<DropdownMenuItem<String>>((e) {
          return DropdownMenuItem(
            value: e,
            child: Text(e),
          );
        }).toList(),
        onChanged: (value) {
          setState(() {
            dropdownValue = value;
          });
        },
      ),
    );
  }
}
