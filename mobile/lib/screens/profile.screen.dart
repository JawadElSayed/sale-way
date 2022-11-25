import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/providers/user.provider.dart';
import 'package:mobile/widgets/circle_image.dart';
import 'package:mobile/widgets/text_input.dart';
import 'package:provider/provider.dart';
import '../helpers/config/config.dart';
import '../providers/auth.provider.dart';

class ProfileScreen extends StatefulWidget {
  ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final nameCntroller = TextEditingController();
  var _selectedDate = DateTime.now().subtract(Duration(days: 365 * 23));

  void _presentDatePicker() {
    showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(1900),
            lastDate: DateTime.now())
        .then((value) {
      if (value == null) return;
      setState(() {
        _selectedDate = value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    User user = Provider.of<Auth>(context).userGetter;
    _selectedDate = DateTime.parse(user.DOB);
    // _selectedGender = user.gender;
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 30),
      margin: EdgeInsets.only(top: MediaQuery.of(context).size.height * 0.1),
      height: MediaQuery.of(context).size.height * 0.82,
      child: SingleChildScrollView(
        child: Column(children: [
          CircleImage(
              url: '${Config.staticUrl}/static/images/profile/default.jpeg',
              radius: 60),
          Form(
              child: Container(
            height: 450,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                TextInput(
                    label: "name",
                    placeholder: "Name",
                    initialValue: user.name),
                TextInput(
                  label: "Email",
                  placeholder: "Example@Example.com",
                  initialValue: user.email,
                ),
                Container(
                  width: MediaQuery.of(context).size.width,
                  decoration: BoxDecoration(
                      border: Border(
                          bottom: BorderSide(
                              width: 1,
                              color: Theme.of(context).primaryColor))),
                  child: TextButton(
                    onPressed: _presentDatePicker,
                    style: TextButton.styleFrom(
                        foregroundColor: Theme.of(context).primaryColor),
                    child: Container(
                      alignment: Alignment.centerLeft,
                      child: Text(
                          style: TextStyle(
                              fontSize: 20,
                              color: Colors.black,
                              fontWeight: FontWeight.w400),
                          (_selectedDate == null
                              ? 'Select Date Of Birth'
                              : DateFormat.yMMMMd().format(_selectedDate))),
                    ),
                  ),
                ),
              ],
            ),
          )),
        ]),
      ),
    );
  }
}
