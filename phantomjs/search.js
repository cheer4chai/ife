var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var key = system.args[1];
var device = system.args[2] || 'pc';
var url = 'https://www.baidu.com/s?wd='+ encodeURI(key);
var time = Date.now();
var returnData = {};
phantom.outputEncoding="gbk";

page.open(url, function(status) {
	if ( status === "success" ) {
		time = Date.now() - time;
		console.log(page.title); 
		returnData.code = 1;
		returnData.msg = '抓包成功';
		returnData.time = time;
		page.includeJs(
		  // Include the https version, you can change this to http if you like.
		  'http://libs.baidu.com/jquery/1.11.3/jquery.min.js',
		  function() {
		  	var data = page.evaluate(function(){
		  		var dataLists = [];
		  		var dom = $('.c-container');
		  		for(var i=0;i<dom.length;i++){
		  			var list = {};
		  			list.title = $(dom[i]).find('.t').text().trim();
		    		list.info = $(dom[i]).find('.c-abstract').text();
		    		list.link = $(dom[i]).find('.t a').attr('href');
		    		list.pic = dom.eq(i).find('.c-img').attr('src') || '';
		    		dataLists.push(list);
		  		}
		  		return dataLists;
		  	})
		  	returnData.dataList = data;
		  	console.log(JSON.stringify(returnData))
		  	fs.write('task.json',JSON.stringify(returnData),'w');
		    phantom.exit();
		  });
	} else {
		console.log("Page failed to load."); 
	}
 	
});
