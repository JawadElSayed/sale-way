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
        newNotifications.add(await sendNotification(branch));
        continue;
      }
    }
  }
  return newNotifications;
}

Future<Notification> sendNotification(branch) async {
  Notification newNotification;
  String deviceToken = "";
  await FirebaseMessaging.instance.getToken().then((token) {
    print("device token: $token");
    deviceToken = token.toString();
  });
  var body = jsonEncode({
    "token": deviceToken,
    "title": "${branch.name}",
    "body": "${branch.name} has discount nearby check out!",
    "branch_id": branch.id,
  });
  final res = await http.post("/notification", body);
  final extracData = jsonDecode(res.body) as Map;
  print("data: $extracData");
  final notification = extracData["notification"];

  newNotification = Notification(
      user_id: notification["user_id"],
      branch_id: notification["branch_id"],
      title: notification["title"],
      message: notification["message"],
      created_at: DateTime.now().toString(),
      clicked: notification["clicked"],
      deleted: notification["deleted"],
      cliked_at: notification["clicked_at"],
      firebase_id: notification["firebase_id"],
      branches: notification["branches"]);
  return newNotification;
}

void deviceToken() async {
  await FirebaseMessaging.instance.getToken().then((token) {
    print("device token: $token");
  });
}
