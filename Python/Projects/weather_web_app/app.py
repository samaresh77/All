from flask import Flask, render_template, request
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


@app.route("/", methods=["GET", "POST"])
def home():
    weather_data = None
    error = None

    if request.method == "POST":
        city = request.form.get("city")

        if city:
            params = {
                "q": city,
                "appid": API_KEY,
                "units": "metric"
            }

            try:
                response = requests.get(BASE_URL, params=params)
                data = response.json()

                if response.status_code == 200:
                    weather_data = {
                        "city": data["name"],
                        "country": data["sys"]["country"],
                        "temperature": data["main"]["temp"],
                        "feels_like": data["main"]["feels_like"],
                        "humidity": data["main"]["humidity"],
                        "condition": data["weather"][0]["description"].title(),
                        "wind": data["wind"]["speed"]
                    }
                else:
                    error = data.get("message", "City not found")

            except requests.exceptions.RequestException:
                error = "Network error. Try again."

    return render_template("index.html", weather=weather_data, error=error)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
