var WebTorrent = require('webtorrent')
var fs = require('fs')
const db = require('dropbox-stream');
const TOKEN = '';
//const FILETOUPLOAD = '/CargoJs/';

var client = new WebTorrent()
var torrentId = 'magnet:?xt=urn:btih:0d158ad5ece9f95cdbc13caa3c1be977b4b74832&dn=Justice.League.2017.1080p.KORSUB-JesusLovesYew%5BEtHD%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'

client.add(torrentId, function (torrent) {
    // Torrents can contain many files. Let's use the .mp4 file
    torrent.files.forEach(function(file){
        // do something with file
        
        var stream = file.createReadStream()
        stream.on('data', (chunk) => {
            console.log(`Received ${chunk.length} bytes of data.`);
          });

          //var wstream = fs.createWriteStream('Download/' + file.name);

         // stream.pipe(wstream);


          var dbox = db.createDropboxUploadStream({
            token: TOKEN,
            filepath: '/' + torrent.name + '/' + file.name,
            chunkSize: 1000 * 1024,
            autorename: true
          })
          .on('error', err => console.log(err))
          .on('progress', res => console.log(res))
          .on('metadata', metadata => console.log('Metadata', metadata))

          stream.pipe(dbox);
     })

     torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes)
        console.log('total downloaded: ' + torrent.downloaded);
        console.log('download speed: ' + torrent.downloadSpeed)
        console.log('progress: ' + torrent.progress)
      })

  })