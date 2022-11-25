import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import './providers/notifications.provider.dart';
import './providers/products.provider.dart';
import './providers/branches.provider.dart';
import './screens/tabs.screen.dart';
import './screens/map.screen.dart';
import './screens/notification.screen.dart';
import './screens/product.screen.dart';
import './screens/products.screen.dart';
import './screens/profile.screen.dart';
import './screens/signup.screen.dart';
import './screens/stores.screen.dart';
import './screens/login.screen.dart';
import './screens/store.screen.dart';
import 'helpers/notificationservice/local_notification_service.dart';
import 'package:provider/provider.dart';

import 'providers/auth.provider.dart';

Future<void> backgroundHandler(RemoteMessage message) async {
  LocalNotificationService.createanddisplaynotification(message);
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(backgroundHandler);
  LocalNotificationService.initialize();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: Branches(),
        ),
        ChangeNotifierProvider.value(
          value: Products(),
        ),
        ChangeNotifierProvider.value(
          value: Notifications(),
        ),
        ChangeNotifierProvider.value(
          value: Auth(),
        )
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
            primaryColor: Color.fromARGB(255, 112, 133, 238),
            accentColor: Color.fromARGB(255, 155, 170, 243),
            textTheme: const TextTheme(
                headline1: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.w700,
                    color: Colors.black),
                headline3: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.black))),
        initialRoute: "/",
        routes: {
          "/": (context) => LoginScreen(),
          "/signup": (ctx) => const SignUpScreen(),
          "/tab": (ctx) => const TabScreen(),
          "/stores": (ctx) => StoresScreen(),
          "/store": (ctx) => StoreScreen(),
          "/products": (ctx) => const ProductsScreen(),
          "/product": (ctx) => ProductScreen(),
          "/map": (ctx) => const MapScreen(),
          "/notification": (ctx) => const NotificationScreen(),
          "/profile": (ctx) => ProfileScreen(),
        },
      ),
    );
  }
}
