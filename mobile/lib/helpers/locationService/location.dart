import 'dart:async';
import 'dart:convert';
import 'package:geolocator/geolocator.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import '../http/http.dart' as http;

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

  permission = await Geolocator.checkPermission();

  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
  }
}

void livePosition(branches) async {
  positionStream =
      Geolocator.getPositionStream().listen((Position? position) async {
    // print(position == null ? 'Unknown' : '${position}');
    currentLocation = position!;
    await calculatingDistance();
  });
}

var count = 0;
Future calculatingDistance() async {
  var distance;

  for (int i = 0; i < stores.length; i++) {
    distance = Geolocator.distanceBetween(
        currentLocation.latitude,
        currentLocation.longitude,
        stores[i]["latitude"] as double,
        stores[i]["longitude"] as double);
    if (distance < 50 &&
        DateTime.now()
            .subtract(Duration(hours: 1))
            .isAfter(DateTime.parse(stores[i]["lastNotification"] as String)) &&
        count < 1) {
      String deviceToken = "";
      await FirebaseMessaging.instance.getToken().then((token) {
        deviceToken = token.toString();
      });
      var body = jsonEncode({
        "token": deviceToken,
        "title": "${stores[i]["id"]}",
        "body": "${stores[i]["id"]} has distance nearby chechout!!!"
      });
      var res = await http.post("/notification", body);
      // print(res.body);
      count++;
    }
    // print(distance);
  }
}
