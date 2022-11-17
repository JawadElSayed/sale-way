import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
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
        )
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primaryColor: Color.fromARGB(255, 112, 133, 238),
          accentColor: Color.fromARGB(255, 155, 170, 243),
        ),
        initialRoute: "/",
        routes: {
          "/": (ctx) => const TabScreen(),
          "/signup": (ctx) => const SignUpScreen(),
          "/login": (ctx) => const LoginScreen(),
          "/stores": (ctx) => StoresScreen(),
          "/store": (ctx) => const StoreScreen(),
          "/products": (ctx) => const ProductsScreen(),
          "/product": (ctx) => const ProductScreen(),
          "/map": (ctx) => const MapScreen(),
          "/notification": (ctx) => const NotificationScreen(),
          "/profile": (ctx) => const ProfileScreen(),
        },
      ),
    );
  }
}
