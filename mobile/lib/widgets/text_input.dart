import 'package:flutter/material.dart';

class TextInput extends StatelessWidget {
  final label;
  final placeholder;
  final password;
  final validator;
  final onSave;
  var initialValue;

  TextInput(
      {super.key,
      this.label,
      this.placeholder,
      this.password = false,
      this.validator,
      this.onSave,
      this.initialValue});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: initialValue,
      obscureText: password,
      decoration: InputDecoration(
          labelStyle: TextStyle(color: Theme.of(context).primaryColor),
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(
              color: Theme.of(context).primaryColor,
              width: 1.0,
            ),
          ),
          focusedBorder: UnderlineInputBorder(
            borderSide: BorderSide(
              color: Theme.of(context).primaryColor,
              width: 1.0,
            ),
          ),
          labelText: label,
          hintText: placeholder,
          hintStyle: const TextStyle(color: Colors.grey),
          contentPadding: const EdgeInsets.only(left: 10, bottom: 5)),
      style: const TextStyle(fontSize: 20.0, color: Colors.black),
      validator: (value) => validator(value),
      onSaved: (newValue) => onSave(newValue),
    );
  }
}
