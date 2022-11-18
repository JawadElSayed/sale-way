import 'package:http/http.dart' as http;

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphd2FkMkB0ZXN0LmNvbSIsIm5hbWUiOiJqYXdhZCIsInVzZXJUeXBlIjoyLCJpYXQiOjE2Njg3MzQ4ODksImV4cCI6MTY2ODgyMTI4OX0.L-XFsSShCsc6nIns0YQKsGHZQLPRAck28m1ogJpeCh8";

Map<String, String> headers = {
  'Content-Type': 'application/json',
  'authorization': 'Bearer $token'
};

const baseURL = "192.168.0.103:3000";
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
