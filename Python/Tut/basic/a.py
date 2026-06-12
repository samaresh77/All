# Text to Speech conversion using gTTS (Google Text-to-Speech)
from gtts import gTTS

# Create a gTTS object with the desired text
# tts = gTTS(text="Hello Samaresh! Happy New Year", lang="en")
tts = gTTS(text="Oi Rakhi! Phone ta rekhe dao nahale voy asbe ", lang="bn")

# Save the generated speech to an mp3 file
tts.save("hello.mp3")

# Notify the user that the file has been generated
print("hello.mp3 generated")
