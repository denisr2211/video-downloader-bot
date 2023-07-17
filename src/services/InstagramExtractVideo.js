const axios = require('axios');

async function extractInstagramVideoUrl(videoUrl) {
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post_v2.php',
            params: {
                url: videoUrl
            },
            headers: {
                'X-RapidAPI-Key': '31fb6d0ec3mshd0800fc09064228p1f0f25jsn1157f15efc32',
                'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com'
            }
        };
        const response = await axios.request(options)

        const result = {
            videoUrl: response.data.items[0].video_versions[0].url,
            caption: response.data.items[0].caption?.text || ''
        }
        return result

    } catch (error) {
        console.error(error);
    }
}

module.exports = { extractInstagramVideoUrl }