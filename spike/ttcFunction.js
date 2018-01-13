var WebTorrent = require('webtorrent')
var fs = require('fs')
const db = require('dropbox-stream');
const TOKEN = '-Ze9-YawEpMAAAAAAAAF8eoZq31QFeE4c7rPF2D8ct-VXWBj-QVXC_mL0MJaCDOd';

var client = new WebTorrent()
var torrentId = 'magnet:?xt=urn:btih:0d158ad5ece9f95cdbc13caa3c1be977b4b74832&dn=Justice.League.2017.1080p.KORSUB-JesusLovesYew%5BEtHD%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'


module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('Yay!');
    
    
    var client = new WebTorrent();
    var magnetURI = 'magnet:?xt=urn:btih:01c227c8c9aac311f9365b163ea94708c27a7db4&dn=The+Subtle+Art+of+Not+Giving+a+Fck+%282016%29+%28Epub%29+Gooner&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

    client.add(torrentId, function (torrent) {
        // Torrents can contain many files. Let's use the .mp4 file
        torrent.files.forEach(function(file){
            // do something with file
            
            var stream = file.createReadStream()
            stream.on('data', (chunk) => {
                context.log(`Received ${chunk.length} bytes of data.`);
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
            context.log('just downloaded: ' + bytes)
            context.log('total downloaded: ' + torrent.downloaded);
            context.log('download speed: ' + torrent.downloadSpeed)
            context.log('progress: ' + torrent.progress)
          })


          

          torrent.on('done', function(){
            console.log('torrent finished downloading');
            torrent.files.forEach(function(file){
                context.log("calling to context.done")
                context.done()
            })
          })
      })


    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }

};