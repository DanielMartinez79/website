var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

	var q = url.parse(req.url,true);
	var file = ".." + q.pathname;
	if (file == "../"){
		file = "../index.html";
	}

	var type = 'text/html';
	if (file.indexOf('.css') != -1) {
		type = 'text/css';
	} else if (file.indexOf('.pdf') != -1) {
		type = 'application/pdf';
	}
	console.log(file);
	fs.readFile(file, function(err,data) {
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found!");
		}
		res.writeHead(200, {'Content-Type': type});
		res.write(data);
		res.end();
	}); 
}).listen(8080);
