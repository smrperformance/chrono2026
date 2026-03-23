(function( $ ) {
	
	$.fn.fullFrame = function() {
		
		var $body = $('body');
		
		this.each(function() {
			var $target = $( this );
			$target.fullFrameResizeThrottleTimeout = null;
			
			// Init styles
			$target.css({
				'transform-origin': '0 0',
				'display': 'inline-block'
			});
			$body.css({
				'overflow': 'hidden',
				'height': '100%'
			}).parent().css({
				'overflow': 'hidden',
				'height': '100%'
			});
			
			// Resize and keep ratio on resize
			$(window).on('resize', function(){
				fullFrameResizeThrottle($target);
			});
			fullFrameResize($target);
		});
		
		function fullFrameResizeThrottle($target){
			clearTimeout($target.fullFrameResizeThrottleTimeout);
			$target.fullFrameResizeThrottleTimeout = setTimeout(function(){
				fullFrameResize($target)
			}, 200);
		}
		
		//
		function fullFrameResize($target){
			var scaleFactor = 0;
			var tRatio;
			var vRatio;
			
			var vw = $body.outerWidth();
			var vh = $body.innerHeight();
			var tw = $target.outerWidth();
			var th = $target.outerHeight();

			tRatio = tw/th;
			vRatio = vw/vh;
			
			// Get scale factor
			if(tRatio > vRatio)
				scaleFactor = vw / tw;
			else
				scaleFactor = vh / th;
			
			$target.css('transform', 'scale('+scaleFactor+')');
		}
		
		return this;
	};
	
	
}( jQuery ));
