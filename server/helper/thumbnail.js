const spawn = require('child_process').spawn;
const cmd = '/usr/bin/ffmpeg'

const generateStreamThumbnail = (stream_key) => {
    const args = [
        '-y',
        '-i', 'http://34.87.8.90:8000/live/'+stream_key+'.flv',
        '-ss', '00:00:01',
        '-vframes', '1',
        '/backend/thumbnails/'+stream_key+'.png',
    ];

    spawn(cmd, args, {
        detached: true,
        stdio: 'ignore'
    }).unref();
};

module.exports = generateStreamThumbnail