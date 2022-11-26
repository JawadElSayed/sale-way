import 'package:http/http.dart' as http;
import 'package:mobile/helpers/config/config.dart';
import 'package:shared_preferences/shared_preferences.dart';

var token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphd2FkMkB0ZXN0LmNvbSIsIm5hbWUiOiJraGFsZWQiLCJ1c2VyVHlwZSI6MiwiaWF0IjoxNjY5MzEzMjAyLCJleHAiOjE2NjkzOTk2MDJ9.iFZR4bjGa_RkrrMfJtYJd_zZEZox8TuOHR-z8RaEE6s";

Future getToken() async {
  final prefs = await SharedPreferences.getInstance();
  final String? ttoken = prefs.getString('token');
  token = ttoken as String;
  return;
}

Map<String, String> headers = {
  'Content-Type': 'application/json',
  'authorization': 'Bearer $token'
};

const baseURL = Config.staticUrl;
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
