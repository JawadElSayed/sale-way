import 'dart:async';
import 'dart:convert';
import 'package:geolocator/geolocator.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import '../../providers/notification.provider.dart';
import '../http/http.dart' as http;

final LocationSettings locationSettings = LocationSettings(
  accuracy: LocationAccuracy.high,
  distanceFilter: 1,
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

void livePosition(branches, notifications) async {
  List<Notification> notificationlist = notifications;

  StreamSubscription<Position> positionStream =
      Geolocator.getPositionStream(locationSettings: locationSettings)
          .listen((Position? position) {});
  positionStream.onData((data) {
    currentLocation = data;
  });
  Timer.periodic(Duration(seconds: 5), (timer) async {
    // print(notificationlist);

    var newNotifications =
        await calculatingDistance(branches, notificationlist, currentLocation);
    if (newNotifications != null) {
      for (var notification in newNotifications) {
        notificationlist.add(notification);
      }
    }
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
