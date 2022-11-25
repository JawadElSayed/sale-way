import 'package:flutter/material.dart';
import 'package:mobile/widgets/notification_card.dart';
import 'package:provider/provider.dart';

import '../providers/notifications.provider.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({super.key});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  void deleteAllNotifications(notifications) async {
    for (var notification in notifications) {
      var data = notification.firebase_id;

      await Provider.of<Notifications>(context, listen: false)
          .deleteNotification(data);
    }

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    List allNotifications =
        Provider.of<Notifications>(context).notificationsGetter;
    List notifications = [];
    for (var i = 0; i < allNotifications.length; i++) {
      if (allNotifications[i].clicked == false &&
          allNotifications[i].deleted == false) {
        notifications.add(allNotifications[i]);
      }
    }

    return Container(
      child: Column(
        children: [
          Container(
            height: MediaQuery.of(context).size.height * 0.20,
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
            decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            child: Container(
                margin:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Notifications",
                      style: TextStyle(fontSize: 30, color: Colors.white),
                    ),
                    IconButton(
                      icon: Icon(Icons.delete),
                      color: Colors.red,
                      onPressed: () => deleteAllNotifications(notifications),
                    ),
                  ],
                )),
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.92 - 160,
            padding: EdgeInsets.symmetric(horizontal: 10),
            child: notifications == []
                ? SizedBox()
                : ListView(
                    children: notifications.map((notification) {
                      return NotificationCard(notification: notification);
                    }).toList(),
                  ),
          ),
        ],
      ),
    );
  }
}
