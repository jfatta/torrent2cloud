var WebTorrent = require('webtorrent');
var fs = require('file-system');


module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('Yay!');
    
    fs.writeFile('D:/local/Temp/message.txt', input, (err) => {
    if (err) {
        context.log(err);
        throw err;
    });
    
    var client = new WebTorrent();
var magnetURI = 'magnet:?xt=urn:btih:01c227c8c9aac311f9365b163ea94708c27a7db4&dn=The+Subtle+Art+of+Not+Giving+a+Fck+%282016%29+%28Epub%29+Gooner&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

client.add(magnetURI, { path: 'D:/local/Temp' }, function (torrent) {
    torrent.on('done', function () {
      context.log('torrent download finished');
    });
  });

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
    context.done();
};