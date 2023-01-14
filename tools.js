const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const Downloader = require("nodejs-file-downloader");
const path = require("node:path");
const exec = require("await-exec");
const fs = require("node:fs");

module.exports = {
  async playMp3File(interaction, mp3Url) {
    
    const member = interaction.member;

    const connection = joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: member.guild.id,
      adapterCreator: member.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, async () => {

      console.log("Ready");

      const Downloader = require("nodejs-file-downloader");

      (async () => {
        //Wrapping the code with an async function, just for the sake of example.
  
        const downloader = new Downloader({
          url: mp3Url, //If the file name already exists, a new file with the name 200MB1.zip is created.
          directory: "mp3Play", //This folder will be created, if it doesn't exist.
          fileName: "audio.mp3",
          cloneFiles: false
        });
        try {
          const {filePath,downloadStatus} = await downloader.download(); //Downloader.download() resolves with some useful properties.
        } catch (error) {
          //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
          //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
          console.log("Download failed", error);
        }
      })();
  
      console.log("test");
      await exec("python splitMP3.py mp3Play/audio.mp3 29")
  
      console.log("test");
  
      const player = createAudioPlayer();

      const mp3Path = path.join(__dirname, "mp3Split"); // Get the mp3s path
      const mp3Files = fs.readdirSync(mp3Path).filter(file => file.endsWith(".mp3")); // Get each js file in the commands directory

      const mp3FilePath = [];

      for(const file of mp3Files){ // Foreach mp3 file
          const filePath = path.join(mp3Path, file); // get each command mp3 path
          mp3FilePath.push(filePath);
      }


      interaction.channel.send("Starting Audio Book Transcription!")

      let done = false;

      player.on(AudioPlayerStatus.Idle, () => {
        //done = true
      });

      for(mp3 of mp3Files){
        done = false
        console.log("test")
        await exec("python transcribe.py mp3Split/" + mp3)
        console.log("test")
        const content = fs.readFileSync(path.join("txtSplit", mp3.replace("mp3", "txt"))).toString();
        console.log(content)
        await interaction.channel.send(content)
        let resource = createAudioResource(path.join("mp3Split", mp3));

        // This is supposed to play the audio file vvvvv

        player.play(resource);

        connection.subscribe(player);
        while(!done){}
      }
      /*await exec("python transcribe.py " + new_url, (error, stdout, stderr) => {
        console.log(stdout);
      });*/

      
    });
  }

}
