var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var key = system.args[1];
var device = system.args[2] || 'pc';
var url = 'https://www.baidu.com/s?wd='+ encodeURI(key);
if(device == 'pc'){
	page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
}else if(device == 'phone'){
	page.settings.userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5';
}else if(device == 'ipad'){
	page.settings.userAgent = 'Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5';
}
var time = Date.now();
var returnData = {};
phantom.outputEncoding="gbk";

page.open(url, function(status) {
	if ( status === "success" ) {
		time = Date.now() - time;
		returnData.code = 1;
		returnData.msg = '抓包成功';
		returnData.time = time;
		returnData.device = device;
		returnData.settings = page.settings.userAgent;
		returnData.size = page.viewportSize;
		returnData.clipRect = page.clipRect;
		console.log(JSON.stringify(returnData));
		phantom.exit();
	} else {
		console.log("Page failed to load."); 
	}
 	
});
