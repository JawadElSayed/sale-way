import 'package:flutter/material.dart';
import 'package:flutter_map/plugin_api.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';

import '../providers/branches.provider.dart';
import '../widgets/bottom_modal.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  Marker marker(data) {
    return Marker(
      point: LatLng(double.parse(data.latitude), double.parse(data.longitude)),
      width: 80,
      height: 80,
      builder: (context) => Container(
        child: IconButton(
          icon: const Icon(Icons.location_on),
          iconSize: 45,
          color: Colors.blue,
          onPressed: () {
            showModalBottomSheet(
                context: context,
                builder: (builder) {
                  return Container(
                    color: Colors.white70,
                    height: 300,
                    child: BottomModal(data: data),
                  );
                });
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    List branches = Provider.of<Branches>(context).branchesGetter;
    return Container(
      height: MediaQuery.of(context).size.height * 0.92,
      child: FlutterMap(
        options: MapOptions(
          center: LatLng(33.88647, 35.50559),
          zoom: 13,
        ),
        children: [
          TileLayer(
            urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            userAgentPackageName: 'com.example.app',
          ),
          MarkerLayer(
              markers: branches.map((branch) {
            return marker(branch);
          }).toList())
        ],
      ),
    );
  }
}
