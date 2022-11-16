import 'package:http/http.dart' as http;

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphd2FkMkB0ZXN0LmNvbSIsIm5hbWUiOiJqYXdhZCIsInVzZXJUeXBlIjoyLCJpYXQiOjE2Njg2MTYwMjksImV4cCI6MTY2ODYxOTYyOX0.NjI0k85QdpnDPcTIZzFU7FiDUCdleThZR2KCwRhV_70";

const baseURL = "localhost:3000";
Future get(link) async {
  final url = Uri.http(baseURL, link);

  http.get(url, headers: {"token": "Bearer $token"});
}

Future post(link, body) async {
  final url = Uri.http(baseURL, link);

  http.post(url,
      body: body,
      headers: {"Content-Type": "application/json", "token": "Bearer $token"});
}

Future put(link, body) async {
  final url = Uri.http(baseURL, link);

  http.put(url,
      body: body,
      headers: {"Content-Type": "application/json", "token": "Bearer $token"});
}

Future delete(link, body) async {
  final url = Uri.http(baseURL, link);

  http.delete(url,
      body: body,
      headers: {"Content-Type": "application/json", "token": "Bearer $token"});
}
