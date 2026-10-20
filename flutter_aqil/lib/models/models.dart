import 'package:flutter/material.dart';

class ServiceItem {
  final String id;
  final String title;
  final String description;
  final int price;
  final IconData icon;
  final Color color;

  const ServiceItem({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.icon,
    required this.color,
  });
}

class SmartDevice {
  final String id;
  final String name;
  final String room;
  final String type;
  bool state;
  double targetTemp;
  String value;

  SmartDevice({
    required this.id,
    required this.name,
    required this.room,
    required this.type,
    this.state = true,
    this.targetTemp = 22.5,
    this.value = 'Me\'yorda',
  });
}

class OrderItem {
  final String id;
  final String title;
  final String childName;
  final String pinCode;
  final int price;
  final String status;
  final String eta;
  final String assignedTo;

  const OrderItem({
    required this.id,
    required this.title,
    required this.childName,
    required this.pinCode,
    required this.price,
    required this.status,
    required this.eta,
    required this.assignedTo,
  });
}
