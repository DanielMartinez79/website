var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
	
	var q = url.parse(req.url, true);
	var file = "." + q.pathname;
	if (file == "./"){
		file = "index.html";
	}
	fs.readFile(file, function(err,data) {
		if (file.indexOf('.css') != -1) {
			type = 'text/css';
		} else {
			type = 'text/html';
		}
		res.writeHead(200, {'Content-Type': type});
		res.write(data);
		res.end();
	}); 
}).listen(8080);
