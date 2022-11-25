import 'dart:async';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mobile/helpers/notificationservice/push_notification.dart';
import 'package:mobile/providers/products.provider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../providers/branch.provider.dart';
import '../providers/branches.provider.dart';
import '../providers/notifications.provider.dart';
import '../providers/notification.provider.dart' as n;
import './map.screen.dart';
import './notification.screen.dart';
import './products.screen.dart';
import './profile.screen.dart';
import './stores.screen.dart';
import '../helpers/locationService/location.dart' as location;
import '../helpers/notificationservice/notification.dart' as notification;
import '../helpers//http/http.dart' as http;

class TabScreen extends StatefulWidget {
  const TabScreen({super.key});

  @override
  State<TabScreen> createState() => _TabScreenState();
}

class _TabScreenState extends State<TabScreen> {
  List<Branch> branches = [];
  bool _isLoading = true;

  @override
  void initState() {
    notification.permission();
    location.locationPermission();
    pushNotification.displayNotification();
    super.initState();
  }

  Future getData() async {
    await Provider.of<Branches>(context, listen: false).getBranches();
    await Provider.of<Products>(context, listen: false).getProducts();
  }

  var init = true;

  @override
  void didChangeDependencies() {
    if (init) {
      getData();
    }
    init = false;

    super.didChangeDependencies();
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
    branches = Provider.of<Branches>(context).branchesGetter;
    // location.livePosition(branches);
    return Scaffold(
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(child: _pages[_selectedPageIndex]),
      bottomNavigationBar: Container(
        height: MediaQuery.of(context).size.height * 0.08,
        child: BottomNavigationBar(
            onTap: _selectPage,
            backgroundColor: Theme.of(context).primaryColor,
            unselectedItemColor: Colors.white,
            selectedItemColor: Theme.of(context).accentColor,
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
      ),
    );
  }
}
