import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")  # 🔑 Replace with your API key
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(city):
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"  # Celsius
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        data = response.json()

        city_name = data["name"]
        country = data["sys"]["country"]
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        humidity = data["main"]["humidity"]
        weather = data["weather"][0]["description"].title()
        wind_speed = data["wind"]["speed"]

        print(f"\n📍 Weather in {city_name}, {country}")
        print(f"🌡️ Temperature: {temp}°C (Feels like {feels_like}°C)")
        print(f"☁️ Condition: {weather}")
        print(f"💧 Humidity: {humidity}%")
        print(f"🌬️ Wind Speed: {wind_speed} m/s")

    else:
        print("❌ City not found. Please check the name.")


if __name__ == "__main__":
    while True:
        city = input("\nEnter city name (or 'quit' to exit): ")
        if city.lower() == "quit":
            print("👋 Goodbye!")
            break
        get_weather(city)
