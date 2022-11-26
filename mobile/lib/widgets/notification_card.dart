import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/helpers/config/config.dart';
import 'package:provider/provider.dart';
import '../providers/notification.provider.dart' as n;

import '../providers/notifications.provider.dart';
import 'circle_image.dart';

class NotificationCard extends StatefulWidget {
  final n.Notification notification;
  const NotificationCard({required this.notification, super.key});

  @override
  State<NotificationCard> createState() => _NotificationCardState();
}

class _NotificationCardState extends State<NotificationCard> {
  void selectNotification(BuildContext ctx) async {
    var data = jsonEncode({"firebase_id": widget.notification.firebase_id});
    Navigator.of(ctx)
        .pushNamed("/store", arguments: widget.notification.branch_id);
    setState(() async {
      await Provider.of<Notifications>(context, listen: false)
          .clickNotification(data);
    });
  }

  void deleteNotification() async {
    var data = widget.notification.firebase_id;

    await Provider.of<Notifications>(context, listen: false)
        .deleteNotification(data);
  }

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: UniqueKey(),
      direction: DismissDirection.endToStart,
      onDismissed: (direction) => deleteNotification(),
      background: Container(
        padding: EdgeInsets.only(right: 20),
        margin: EdgeInsets.symmetric(vertical: 4),
        color: Theme.of(context).colorScheme.error,
        child: Icon(Icons.delete, color: Colors.white, size: 40),
        alignment: Alignment.centerRight,
      ),
      child: InkWell(
        onTap: () => selectNotification(context),
        child: Container(
          child: Card(
            margin: EdgeInsets.symmetric(vertical: 4),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            elevation: 2.5,
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 10, 0, 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Container(
                    child: CircleImage(
                        url:
                            '${Config.staticUrl}${widget.notification.branches["image"]}',
                        radius: 30),
                  ),
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                            padding: EdgeInsets.only(bottom: 10),
                            child: Text(
                              widget.notification.title,
                              style: Theme.of(context).textTheme.headline3,
                            )),
                        Container(
                          padding: EdgeInsets.only(right: 10),
                          child: FractionallySizedBox(
                              widthFactor: 1,
                              alignment: Alignment.centerLeft,
                              child: Text(widget.notification.message)),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
