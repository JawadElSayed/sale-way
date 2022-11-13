import 'package:flutter/material.dart';
import './screens/map.screen.dart';
import './screens/notification.screen.dart';
import './screens/product.screen.dart';
import './screens/products.screen.dart';
import './screens/profile.screen.dart';
import './screens/signup.screen.dart';
import './screens/stores.screen.dart';
import './screens/login.screen.dart';
import './screens/store.screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginScreen(),
      routes: {
        "/signup": (ctx) => SignUpScreen(),
        "/login": (ctx) => LoginScreen(),
        "/stores": (ctx) => StoresScreen(),
        "/store": (ctx) => StoreScreen(),
        "/products": (ctx) => ProductsScreen(),
        "/product": (ctx) => ProductScreen(),
        "/map": (ctx) => MapScreen(),
        "/notification": (ctx) => NotificationScreen(),
        "/profile": (ctx) => ProfileScreen(),
      },
    );
  }
}
