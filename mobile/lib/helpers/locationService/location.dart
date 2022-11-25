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

Future calculatingDistance(branches, notifications, ccurrentLocation) async {
  double distance;
  List<Notification> newNotifications = [];
  if (branches == null) return;
  for (var branch in branches) {
    distance = Geolocator.distanceBetween(
        ccurrentLocation.latitude,
        ccurrentLocation.longitude,
        double.parse(branch.latitude),
        double.parse(branch.longitude));

    bool passed = false;
    if (distance < 300) {
      for (var notification in notifications) {
        if (branch.id == notification.branch_id) {
          if ((DateTime.now()
              .subtract(Duration(hours: 12))
              .isBefore(DateTime.parse(notification.created_at)))) {
            passed = true;
            break;
          }
        }
      }

      if (!passed) {
        print("Send notification");
        continue;
      }
    }
  }
  return newNotifications;
}
