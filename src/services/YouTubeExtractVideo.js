// Функция для извлечения ссылки на скачивание видео из текста сообщения
function extractYouTubeVideoUrl(videoUrl) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = videoUrl.match(urlRegex);

    if (matches && matches.length > 0) {
        return matches[0];
    }
    return null;
}

module.exports = { extractYouTubeVideoUrl }