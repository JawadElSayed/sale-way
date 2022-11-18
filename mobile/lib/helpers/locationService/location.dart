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
    await calculatingDistance(branches);
  });
}

var count = 0;
Future calculatingDistance(branches) async {
  double distance;

  for (var branch in branches) {
    distance = Geolocator.distanceBetween(
        currentLocation.latitude,
        currentLocation.longitude,
        double.parse(branch.latitude),
        double.parse(branch.longitude));
    if (distance < 50 &&
        DateTime.now()
            .subtract(const Duration(hours: 1))
            .isAfter(DateTime.parse(branch.last_notification))) {
      String deviceToken = "";
      await FirebaseMessaging.instance.getToken().then((token) {
        deviceToken = token.toString();
      });
      var body = jsonEncode({
        "token": deviceToken,
        "title": "${branch.name}",
        "body": "${branch.name} has distance nearby chechout!!!"
      });
      var res = await http.post("/notification", body);
      // print(res.body);
    }
    // print(distance);
  }
}
