const { Telegraf } = require('telegraf');
const ytdl = require('ytdl-core');
const axios = require('axios');
const { extractYouTubeVideoUrl } = require('./src/services/YouTubeExtractVideo.js');
const { extractInstagramVideoUrl } = require('./src/services/InstagramExtractVideo.js');
require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome');
});

bot.on('text', async (ctx) => {
  const messageText = ctx.message.text

  if (messageText === '/start') {
    ctx.reply('Welcome')
  } else if (messageText) {
    let videoUrl;

    if (messageText.includes('instagram.com')) {
      try {
        const result = await extractInstagramVideoUrl(messageText);
        videoUrl = result.videoUrl;

        ctx.sendChatAction('upload_video');

        const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoBuffer = Buffer.from(response.data, 'binary');
        ctx.replyWithVideo({ source: videoBuffer });
        ctx.sendChatAction('cancel');
      } catch (error) {
        console.error('Error:', error);
        ctx.reply('An error occurred while uploading and sending the video.');
        ctx.sendChatAction('cancel');
      }
    }
    else if (messageText.includes('youtube.com')) {
      try {
        videoUrl = extractYouTubeVideoUrl(messageText);
        ctx.sendChatAction('upload_video');
        const stream = ytdl(videoUrl);
        ctx.replyWithVideo({ source: stream });
        ctx.sendChatAction('cancel')
      } catch (error) {
        console.error('Error:', error);
        ctx.reply('An error occurred while uploading and sending the video.');
        ctx.sendChatAction('cancel');
      }
    } else {
      ctx.reply('Unable to find a video download link in the message.');
    }
  }

})

bot.launch();