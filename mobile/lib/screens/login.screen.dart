import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'package:mobile/widgets/text_input.dart';

enum Mode { signup, login }

class LoginScreen extends StatefulWidget {
  LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey();
  final emailCntroller = TextEditingController();

  Mode mode = Mode.login;

  Map data = {
    "email": null,
    "password": null,
    "name": null,
    "gender": null,
    "DOB": null,
    "user_type": "user",
  };
  final List<String> _genders = ['Male', 'Female'];
  var _selectedGender;
  var _selectedDate;
  var _isLoading = false;

  void _presentDatePicker() {
    showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(1900),
            lastDate: DateTime.now())
        .then((value) {
      if (value == null) return;
      data["DOB"] = value.toString();
      // DateFormat.yMMMMd().format(_selectedDate);
      print(value);
      setState(() {
        _selectedDate = value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        toolbarHeight: 300,
        centerTitle: true,
        title: Container(
            height: MediaQuery.of(context).size.height * 0.15,
            child: Image.asset("assets/images/logo.png")),
      ),
      body: SingleChildScrollView(
          child: Container(
        height: MediaQuery.of(context).size.height -
            300 -
            MediaQuery.of(context).padding.top,
        decoration: BoxDecoration(
          color: Colors.white,
        ),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 40),
              margin: mode == Mode.login
                  ? EdgeInsets.only(top: 85)
                  : EdgeInsets.only(top: 0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    Padding(
                        padding: EdgeInsets.only(bottom: 40),
                        child: TextInput(
                            label: "Email",
                            placeholder: "Example@Example.com",
                            validator: (value) {
                              if (value.isEmpty || !value.contains('@')) {
                                return 'Invalid email!';
                              }
                            },
                            onSave: (value) => data["email"] = value)),
                    Padding(
                      padding: const EdgeInsets.only(bottom: 40),
                      child: TextInput(
                          label: "Password",
                          placeholder: "Password",
                          password: true,
                          validator: (value) {
                            if (value.isEmpty || value.length < 5) {
                              return 'password is too short';
                            }
                          },
                          onSave: (value) => data["password"] = value),
                    ),
                    if (_isLoading)
                      CircularProgressIndicator()
                    else
                      ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Theme.of(context).accentColor,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10)),
                          ),
                          onPressed: () {},
                          child: Container(
                              padding: EdgeInsets.symmetric(
                                vertical: 10,
                              ),
                              alignment: Alignment.center,
                              width: 100,
                              child: Text(
                                  style: TextStyle(fontSize: 20),
                                  (mode == Mode.login ? 'LOGIN' : 'SIGN UP')))),
                  ],
                ),
              ),
            )
          ],
        ),
      )),
    );
  }
}
