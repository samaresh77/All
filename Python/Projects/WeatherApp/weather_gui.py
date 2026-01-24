import requests
import tkinter as tk
from tkinter import messagebox
import os
from dotenv import load_dotenv

# 🔑 Replace with your OpenWeatherMap API key
load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather():
    city = city_entry.get()

    if not city:
        messagebox.showwarning("Input Error", "Please enter a city name")
        return

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if response.status_code != 200:
            messagebox.showerror("Error", data.get("message", "City not found"))
            return

        city_name = data["name"]
        country = data["sys"]["country"]
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        humidity = data["main"]["humidity"]
        weather = data["weather"][0]["description"].title()
        wind_speed = data["wind"]["speed"]

        result = (
            f"📍 {city_name}, {country}\n"
            f"🌡 Temperature: {temp}°C\n"
            f"🤒 Feels Like: {feels_like}°C\n"
            f"☁ Condition: {weather}\n"
            f"💧 Humidity: {humidity}%\n"
            f"🌬 Wind Speed: {wind_speed} m/s"
        )

        result_label.config(text=result)

    except requests.exceptions.RequestException:
        messagebox.showerror("Network Error", "Unable to fetch weather data")


# 🪟 Create Window
root = tk.Tk()
root.title("Weather App 🌦️")
root.geometry("350x400")
root.resizable(False, False)

# 🎨 Title
title_label = tk.Label(root, text="Weather App", font=("Arial", 18, "bold"))
title_label.pack(pady=10)

# 🏙 City Entry
city_entry = tk.Entry(root, font=("Arial", 14), justify="center")
city_entry.pack(pady=10)
city_entry.focus()

# 🔍 Search Button
search_button = tk.Button(root, text="Search Weather", font=("Arial", 12, "bold"),
                          bg="#4CAF50", fg="white", command=get_weather)
search_button.pack(pady=10)

# 📋 Result Label
result_label = tk.Label(root, text="", font=("Arial", 12), justify="left")
result_label.pack(pady=20)

# ▶ Run App
root.mainloop()
