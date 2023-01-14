import speech_recognition as sr
from os import path
from pydub import AudioSegment

# convert mp3 file to wav                                                       
sound = AudioSegment.from_mp3("mp3ToPlay/Chipmunks_sound-Uday-1052330468.mp3")
sound.export("mp3ToPlay/test.wav", format="wav")


# transcribe audio file                                                         
AUDIO_FILE = "mp3ToPlay/test.wav"

# use the audio file as the audio source                                        
r = sr.Recognizer()
with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file                  

        print("test")
        print("Transcription: " + r.recognize_sphinx(audio))
