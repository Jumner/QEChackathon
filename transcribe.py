import speech_recognition as sr
import os
from pydub import AudioSegment
import sys

# convert mp3 file to wav
sound = AudioSegment.from_mp3(sys.argv[1])

export_path = os.path.join(sys.argv[1].replace("mp3", "wav"))

sound.export(export_path, format="wav")

# transcribe audio file                                                         
AUDIO_FILE = export_path

# use the audio file as the audio source                                        
r = sr.Recognizer()
with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file                  

        text = r.recognize_azure(audio, key="d986c1f6b3184bceadd1311b5db96b80", location="eastus");

f = open(sys.argv[1].replace("mp3", "txt"), "w")
f.write(text[0])
f.close()
