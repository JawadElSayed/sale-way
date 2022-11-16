import 'package:flutter/material.dart';
import 'package:mobile/helpers/notificationservice/push_notification.dart';
import './map.screen.dart';
import './notification.screen.dart';
import './products.screen.dart';
import './profile.screen.dart';
import './stores.screen.dart';
import '../helpers/locationService/location.dart' as location;
import '../helpers/notificationservice/notification.dart' as notification;

class TabScreen extends StatefulWidget {
  const TabScreen({super.key});

  @override
  State<TabScreen> createState() => _TabScreenState();
}

class _TabScreenState extends State<TabScreen> {
  String? mtoken = "";

  @override
  void initState() {
    notification.permission();
    location.locationPermission();
    pushNotification.displayNotification();
    super.initState();
  }

  final List<Widget> _pages = [
    StoresScreen(),
    ProductsScreen(),
    MapScreen(),
    NotificationScreen(),
    ProfileScreen(),
  ];

  int _selectedPageIndex = 0;

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Title")),
      body: _pages[_selectedPageIndex],
      bottomNavigationBar: BottomNavigationBar(
          onTap: _selectPage,
          backgroundColor: Colors.blue,
          unselectedItemColor: Colors.white,
          selectedItemColor: Colors.blue.shade100,
          currentIndex: _selectedPageIndex,
          items: [
            BottomNavigationBarItem(
                backgroundColor: Colors.blue,
                icon: Icon(Icons.store),
                label: ""),
            BottomNavigationBarItem(
                backgroundColor: Colors.blue,
                icon: Icon(Icons.shopping_bag),
                label: ""),
            BottomNavigationBarItem(
                backgroundColor: Colors.blue,
                icon: Icon(Icons.location_on),
                label: ""),
            BottomNavigationBarItem(
                backgroundColor: Colors.blue,
                icon: Icon(Icons.notifications),
                label: ""),
            BottomNavigationBarItem(
                backgroundColor: Colors.blue,
                icon: Icon(Icons.person),
                label: ""),
          ]),
    );
  }
}
