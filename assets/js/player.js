var count = 0;
var downloadTab = [];

var downloadMp3 = (function(){
	var debug = true;
	s = false;
	// Var Privée
	function consol(msg){
		if(debug === true){
			console.log(msg)
		}
	}
	function popupError(x){
		if (x == 'urlEmpty') {
			$('#'+x).show().delay(3000).fadeOut();
		}
		if(x == 'urlBad'){
			$('#'+x).show().delay(3000).fadeOut();
		}
		if(x == 'urlError'){
			$('#'+x).show().delay(3000).fadeOut();
		}
	}
	function EncapseUrl(linkUrl){
		// Return error message if URL is bad
		if(linkUrl == undefined){
			popupError('urlBad');
			return;
		}

		// Good link
		if(linkUrl.length == 11){

			// limit url
			if(count == 1){
				console.log('Too much Price');
				return
			}

			var l = "www.youtubeinmp3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v="+linkUrl+"";

			$.get({
				url: "//"+l,
				dataType: 'json'
			})
			.done(function(result, req) {
				consol(result);

				// Return error message si API invalable
				if(result.length == 0){
					popupError('urlError');
					return
				}

				// 600s = 10mn
				if(result.length > 600){
					popupError('urlError');
					return
				}

				// Convert to min approx
				t = secondToMin(result.length);

				// Limit url
				count = count + 1;

				// Put url in 
				$('#counter').text(count);

				downloadTab.push(result.link);

				$('.collection').append("<li id=video-"+count+" class='collection-item'><span class='title'>Titre : <span>"+
					result.title+"</span></span><p>Durée : ~ "+t+" mn</p><input type='hidden' value="+result.link+"></li>");
				return;
				
			})
			.fail(function(msg) {
				popupError('urlError');
				consol(msg)
				return;
			});
		} else {
			console.log(linkUrl);
			popupError('urlBad');
		}
	}
	function secondToMin(time){
		return Math.round(time/60)
	}

	// Var Public
	return {
		'init': function(){
			// Save URL
			window.onbeforeunload = function(){sessionStorage.setItem('url', $('#search').val())}
			//Retrieve URL
			if(sessionStorage.url){
				$('#search').val(sessionStorage.url);
			}
		},
		'loadUrl': function(){
			var l = encodeURI($('#search').val());

			if (l == 0) {
				empty = "urlEmpty";
				popupError(empty);
				return;
			}
			var p = l.split('v=');
			EncapseUrl(p[1]);
		},
		'downloadUrl': function(){
			console.log('Enter in function downloadURL')
			downloadTab[0];
			if (downloadTab.length == 0) {
				popupError('urlEmpty');
				return
			}
			console.log(downloadTab[0])
			document.location.href = downloadTab[0];
		}
	};
});

$('#btn-add-list').click(function(){
	downloadMp3().loadUrl();
});

$('#btn-download').click(function(){
	downloadMp3().downloadUrl();
});

window.onload = function(){
	downloadMp3().init();
}