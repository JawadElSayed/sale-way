import 'dart:async';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mobile/helpers/notificationservice/push_notification.dart';
import './map.screen.dart';
import './notification.screen.dart';
import './products.screen.dart';
import './profile.screen.dart';
import './stores.screen.dart';

class TabScreen extends StatefulWidget {
  const TabScreen({super.key});

  @override
  State<TabScreen> createState() => _TabScreenState();
}

class _TabScreenState extends State<TabScreen> {
  String? mtoken = "";

  final LocationSettings locationSettings = LocationSettings(
    accuracy: LocationAccuracy.high,
    distanceFilter: 100,
  );

  late StreamSubscription<Position> positionStream;
  List<Map<String, Object>> stores = [
    {
      "id": 1,
      "latitude": 33.8885,
      "longitude": 35.5065,
      "lastNotification": "2022-10-10"
    },
    {
      "id": 2,
      "latitude": 33.887,
      "longitude": 35.505,
      "lastNotification": "2022-10-10"
    }
  ];
  late Position currentLocation;

  Future locationPermission() async {
    bool services;
    LocationPermission permission;

    services = await Geolocator.isLocationServiceEnabled();

    if (!services) {
      AwesomeDialog(
          context: context,
          title: "services",
          body: Text("location turned off"))
        ..show();
    }

    permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
  }

  void livePosition() async {
    positionStream =
        Geolocator.getPositionStream().listen((Position? position) {
      print(position == null ? 'Unknown' : '${position}');
      currentLocation = position!;
      calculatingDistance();
    });
  }

  void calculatingDistance() {
    var distance;

    for (int i = 0; i < stores.length; i++) {
      distance = Geolocator.distanceBetween(
          currentLocation.latitude,
          currentLocation.longitude,
          stores[i]["latitude"] as double,
          stores[i]["longitude"] as double);
      if (distance < 50 &&
          DateTime.now().subtract(Duration(hours: 1)).isAfter(
              DateTime.parse(stores[i]["lastNotification"] as String))) {
        print("hello");
      }
      print(distance);
    }
  }

  @override
  void initState() {
    notificationPermission();
    locationPermission();
    getToken();
    pushNotification.displayNotification();
    livePosition();
    super.initState();
  }

  void notificationPermission() async {
    print("object");
    FirebaseMessaging messaging = FirebaseMessaging.instance;

    NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );

    print('User granted permission: ${settings.authorizationStatus}');
  }

  void getToken() async {
    await FirebaseMessaging.instance.getToken().then((token) {
      setState(() {
        mtoken = token;
        print("the token is: $mtoken");
      });
    });
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
