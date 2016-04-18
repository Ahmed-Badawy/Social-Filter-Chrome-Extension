//Social Filter
var D = false;

var current_host = window.location.hostname;
// console.log(current_host);
//site_types are: m.facebook.com , www.facebook.com , mobile.twitter.com , twitter.com , plus.google.com , www.reddit.com , www.youtube.com



function hide(words_array){
	if(current_host=="www.facebook.com") 			hide_elms(words_array,"facebook");
	else if(current_host=="m.facebook.com") 		hide_elms(words_array,"facebook_mobile");
	else if(current_host=="twitter.com") 			hide_elms(words_array,"twitter");
	else if(current_host=="mobile.twitter.com") 	hide_elms(words_array,"twitter_mobile");
	else if(current_host=="plus.google.com") 		hide_elms(words_array,"google_plus");
	else if(current_host=="www.reddit.com") 		hide_elms(words_array,"reddit");
	else if(current_host=="www.youtube.com") 		hide_elms(words_array,"youtube-search");
}
$( document ).ready(function() {
	var words_array=[];
	chrome.storage.sync.get("banned_words2",function(data){
		words_array = (data.banned_words2) ? data.banned_words2 : [];
		if(D) console.log(words_array);
		hide(words_array);
		setInterval(function(){
			hide(words_array);
		},5000);	
	});		
});



/*********************************************************************
Hidding functions
**********************************************************************/
var hide_elms = function(words_array,site_type){
	if(!words_array.length) return;
	for(var i=0;i<words_array.length;i++){
		var cur_word = words_array[i];
		var elms = "";
		if(site_type=='facebook') elms = $(`div.userContentWrapper:not(.sb_modified):contains("${words_array[i]}")`);
		else if(site_type=='facebook_mobile') elms = $(`article.async_like:not(.sb_modified):contains("${words_array[i]}")`);
		else if(site_type=='twitter') elms = $(`li.js-stream-item.stream-item.stream-item:not(.sb_modified):contains("${words_array[i]}")`);
		else if(site_type=='twitter_mobile') elms = $(`li.stream-item.stream-tweet:not(.sb_modified):contains("${words_array[i]}")`);
		else if(site_type=='google_plus') elms = $(`div.Yp.yt.Xa:not(.sb_modified):contains("${words_array[i]}")`);
		else if(site_type=='reddit') elms = $(`div.thing.link:not(.sb_modified):contains("${words_array[i]}")`);
		else if(site_type=='youtube-search') elms = $(`li div.yt-lockup:not(.sb_modified):contains("${words_array[i]}")`);
		if(elms.length > 0){
			elms.html(`<h3 style='font-size:16px;line-height:26px;font-family:georgia;margin:0 auto;text-align:center;color:white;background-color:#444;'>
					Hidden Content
				</h3>`+elms.html()+"<br style='clear:both;' />");
			elms.attr("style","border:3px solid red;line-height:26px;height:26px;overflow:hidden;");
			elms.hover(function(){
				$(this).attr("style","border:2px solid #4e69a2;");
			},function(){
				$(this).attr("style","border:3px solid red;height:26px;overflow:hidden;");
			});
			elms.addClass("sb_modified");
		}
		if(D) console.log("Called");
	}
}


