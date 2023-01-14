const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const got = require('got');
module.exports = {
  playMp3File(member, mp3Url) {
    console.log(member.voice.channelId);
    console.log(mp3Url);
    const connection = joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: member.guild.id,
      adapterCreator: member.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    const stream = got.stream(mp3Url);
    let resource = createAudioResource(stream);
    player.play(resource);
    connection.subscribe(player);
  }
}
