/*!
 * jQuery Notifi Plugin v1.0
 * https://github.com/scullytr/notifi
 *
 * Copyright (c) 2015 Tim Scully;
 * Released under the MIT License (MIT)
 */
(function($){
	$.notifi = function(content, options){
		var o				= $.extend(true, {}, $.notifi.defaults, options),
			notificationBar	= $('#notifications').length ? $('#notifications') : $('<div>', {
				"id":		'notifications',
				"style":	'background:transparent;position:fixed; text-align:center; width:100%; z-index:100;'
			}).prependTo('html'),
			noticeClose		= $(o.noticeClose),
			noticeContent	= content || '&nbsp;',
			notice			= $('<div>',{'class':'notice'}).addClass(o.noticeClass).append(noticeClose.addClass(o.noticeCloseClass)).prepend(noticeContent).appendTo(notificationBar);

		if(o.autoShowDelay){
			setTimeout(function(){
				$.notifi.showNotice(notice, o);
			}, o.autoShowDelay);
		}
		else{
			$.notifi.showNotice(notice, o);
		}

		return notice;
	};

	$.notifi.showNotice = function(notice, o){
		notice.slideDown(o.showSpeed, function() {
			if(o.shown) o.shown();

			var noticeClose = notice.children('.' + o.noticeCloseClass);

			noticeClose.on('click', function(){
				notice.slideUp(o.hideSpeed, function(){
					notice.remove();

					if(o.hidden) o.hidden();
				});
			});

			if(o.autoHideDelay){
				setTimeout(function(){
					notice.slideUp(o.hideSpeed, function(){
						notice.remove();

						if(o.hidden) o.hidden();
					});
				}, o.autoHideDelay);
			}
		});
	};

	$.notifi.defaults = {
		hidden:				null,
		autoHideDelay:		null,
		hideSpeed:			100,
		noticeClass:		'',
		noticeClose:		'<div>X</div>',
		noticeCloseClass:	'notice-close',
		autoShowDelay:		0,
		shown:				null,
		showSpeed:			100
	};
}(jQuery));
