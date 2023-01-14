from pydub import AudioSegment
import sys
import os

dir = 'mp3Split'
for f in os.listdir(dir):
    os.remove(os.path.join(dir, f))

sound = AudioSegment.from_mp3(sys.argv[1])
length = int(sys.argv[2])*1000


file_index = 0
for i in range(0, len(sound), length):
    end_index = i+length if i+length<len(sound) else len(sound)-1
    section = sound[i:end_index]
    section.export(os.path.join("mp3Split", f"{str(file_index)}.mp3"), format="mp3")
    file_index += 1

