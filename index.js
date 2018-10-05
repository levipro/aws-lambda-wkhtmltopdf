var wkhtmltopdf = require('wkhtmltopdf');
var MemoryStream = require('memorystream');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

exports.handler = function(event, context, callback) {
    var body = JSON.parse(event.body);
	var memStream = new MemoryStream();
	var html_utf8 = new Buffer(body.html_base64, 'base64').toString('utf8');
	wkhtmltopdf(html_utf8, body.options, function(code, signal) {
	    const response = {
            statusCode: 200,
            body: JSON.stringify({ pdf_base64: memStream.read().toString('base64') })
        };
        callback(null, response);
	}).pipe(memStream);
};
