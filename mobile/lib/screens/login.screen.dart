import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'package:mobile/widgets/text_input.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../providers/auth.provider.dart';
import '../helpers/http/http.dart' as http;

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

  void login() async {
    var res = await Provider.of<Auth>(context, listen: false).login(data);
    if (res["status"] == "success") {
      print(res["token"]);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', res["token"]);
      await http.getToken();
      Navigator.of(context).pushReplacementNamed("/tab");
    }
  }

  void _switchMode() {
    if (mode == Mode.login) {
      setState(() {
        mode = Mode.signup;
      });
    } else {
      setState(() {
        mode = Mode.login;
      });
    }
  }

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
                    mode == Mode.login
                        ? const SizedBox()
                        : Padding(
                            padding: const EdgeInsets.only(bottom: 40),
                            child: TextInput(
                                label: "Full Name",
                                placeholder: "Name",
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return 'required';
                                  }
                                },
                                onSave: (value) => data["name"] = value),
                          ),
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
                    mode == Mode.login
                        ? const SizedBox(
                            height: 90,
                          )
                        : Padding(
                            padding: const EdgeInsets.only(bottom: 40),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Container(
                                  width: 120,
                                  child: DropdownButton(
                                      underline: Container(
                                        decoration: BoxDecoration(
                                            border: Border(
                                                bottom: BorderSide(
                                                    width: 1,
                                                    color: Theme.of(context)
                                                        .primaryColor))),
                                      ),
                                      hint: const Padding(
                                        padding: EdgeInsets.only(
                                            left: 10, bottom: 5),
                                        child: Text('Gender'),
                                      ),
                                      isExpanded: true,
                                      value: _selectedGender,
                                      onChanged: (newValue) {
                                        data["gender"] = newValue;
                                        setState(() {
                                          _selectedGender = newValue;
                                        });
                                      },
                                      items: _genders.map((gender) {
                                        return DropdownMenuItem(
                                          child: new Text(gender),
                                          value: gender,
                                        );
                                      }).toList()),
                                ),
                                Container(
                                  child: TextButton(
                                    onPressed: _presentDatePicker,
                                    style: TextButton.styleFrom(
                                        foregroundColor:
                                            Theme.of(context).primaryColor),
                                    child: Container(
                                      padding: EdgeInsets.only(top: 12),
                                      decoration: BoxDecoration(
                                          border: Border(
                                              bottom: BorderSide(
                                                  width: 1,
                                                  color: Theme.of(context)
                                                      .primaryColor))),
                                      child: Text(
                                          style: TextStyle(fontSize: 16),
                                          (_selectedDate == null
                                              ? 'Select Date Of Birth'
                                              : DateFormat.yMMMMd()
                                                  .format(_selectedDate))),
                                    ),
                                  ),
                                )
                              ],
                            )),
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
                    TextButton(
                      onPressed: _switchMode,
                      style: TextButton.styleFrom(
                          foregroundColor: Theme.of(context).primaryColor),
                      child: Container(
                        decoration: BoxDecoration(
                            border: Border(
                                bottom: BorderSide(
                                    width: 2.0,
                                    color: Theme.of(context).primaryColor))),
                        child: Text(
                            mode == Mode.login ? 'CREATE ACCOUNT?' : 'LOGIN'),
                      ),
                    )
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
