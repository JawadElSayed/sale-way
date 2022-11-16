import 'package:firebase_messaging/firebase_messaging.dart';

void permission() async {
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

var deviceToken;

void getToken() async {
  await FirebaseMessaging.instance.getToken().then((token) {
    deviceToken = token;
  });
}
