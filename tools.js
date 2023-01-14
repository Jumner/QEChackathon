const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');
const Downloader = require("nodejs-file-downloader");
const path = require("node:path");
const exec = require("await-exec");

module.exports = {
  playMp3File(member, mp3Url) {
    
    const connection = joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: member.guild.id,
      adapterCreator: member.guild.voiceAdapterCreator,
    });

    const Downloader = require("nodejs-file-downloader");

    (async () => {
      //Wrapping the code with an async function, just for the sake of example.

      const downloader = new Downloader({
        url: mp3Url, //If the file name already exists, a new file with the name 200MB1.zip is created.
        directory: "./mp3ToPlay", //This folder will be created, if it doesn't exist.
        fileName: "audio.mp3",
        cloneFiles: "false"
      });
      try {
        const {filePath,downloadStatus} = await downloader.download(); //Downloader.download() resolves with some useful properties.
      } catch (error) {
        //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
        //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
        console.log("Download failed", error);
      }
    })();

    connection.on(VoiceConnectionStatus.Ready, async () => {
      console.log("Ready");
      const player = createAudioPlayer();
      const new_url = path.join(__dirname, "mp3ToPlay", "audio.mp3"); 

      await exec("python transcribe.py " + new_url, (error, stdout, stderr) => {
        console.log(stdout);
      });

      let resource = createAudioResource(new_url);
      player.play(resource);
      connection.subscribe(player);
    });



  }

}
