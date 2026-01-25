from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


def process_forecast(forecast_json):
    daily = {}

    for item in forecast_json["list"]:
        date = item["dt_txt"].split(" ")[0]

        if date not in daily:
            daily[date] = {
                "temp": item["main"]["temp"],
                "icon": item["weather"][0]["icon"]
            }

    forecast_data = []
    for date, info in list(daily.items())[:5]:
        forecast_data.append({
            "date": date,
            "temp": info["temp"],
            "icon": info["icon"]
        })

    return forecast_data


@app.route("/weather")
def get_weather():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "City is required"}), 400

    params = {"q": city, "appid": API_KEY, "units": "metric"}

    weather_res = requests.get(BASE_URL, params=params)
    if not weather_res.ok:
        return jsonify({"error": "City not found"}), 404

    weather_json = weather_res.json()

    forecast_res = requests.get(FORECAST_URL, params=params)
    forecast_data = []
    if forecast_res.ok:
        forecast_data = process_forecast(forecast_res.json())

    return jsonify({
        "city": weather_json["name"],
        "country": weather_json["sys"]["country"],
        "temperature": weather_json["main"]["temp"],
        "feels_like": weather_json["main"]["feels_like"],
        "humidity": weather_json["main"]["humidity"],
        "condition": weather_json["weather"][0]["description"].title(),
        "wind": weather_json["wind"]["speed"],
        "icon": weather_json["weather"][0]["icon"],
        "forecast": forecast_data
    })


if __name__ == "__main__":
    app.run(debug=True)
