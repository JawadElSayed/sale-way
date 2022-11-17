import 'package:http/http.dart' as http;

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphd2FkMkB0ZXN0LmNvbSIsIm5hbWUiOiJqYXdhZCIsInVzZXJUeXBlIjoyLCJpYXQiOjE2Njg3MTUwNDAsImV4cCI6MTY2ODcxODY0MH0.NQRfOPnGHdJlRPCKPbqlGPA-9hM32ZHa1yfK2ZK-Ndg";

Map<String, String> headers = {
  'Content-Type': 'application/json',
  'authorization': 'Bearer $token'
};

const baseURL = "192.168.44.166:3000";
Future get(link) async {
  final url = Uri.http(baseURL, link);

  return await http.get(url, headers: {"authorization": "Bearer $token"});
}

Future post(link, body) async {
  final url = Uri.http(baseURL, link);
  return await http.post(url, body: body, headers: headers);
}

Future put(link, body) async {
  final url = Uri.http(baseURL, link);

  return await http.put(url, body: body, headers: headers);
}

Future delete(link, body) async {
  final url = Uri.http(baseURL, link);

  return await http.delete(url, body: body, headers: headers);
}
