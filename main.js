$( document ).ready(function() {
	
	var date = new Date();
	var s = date.getSeconds()
		+ date.getMinutes() * 60
		+ date.getHours() * 60 * 60;
	var i = s / 60;
	var h = s / 60 / 60;
	var d = null;
	var wd = null;
	var secondDuration = 1000; // Jouer avec cette valeur pour accélérer le temps
	
	var $sNeedle = $('#needle_s');
	var $iNeedle = $('#needle_i');
	var $hNeedle = $('#needle_h');
	var $dNeedle = $('#needle_d');
	var $day = $('#day');
	var angleOffset = 90;// 90 car les aiguilles sont à l'horizontal "au repos"
	
	var sAngle, iAngle, hAngle;
	
	function updateChrono(){
		
		// Increment time
		s++;
		i += 1/60;
		h += 1/60/60;
		
		sAngle = s / 60 * 360 - angleOffset;
		iAngle = i / 60 * 360 - angleOffset;
		hAngle = h / 12 * 360 - angleOffset;
		
		$sNeedle.css({transform: 'rotate('+sAngle+'deg)'});
		$iNeedle.css({transform: 'rotate('+iAngle+'deg)'});
		$hNeedle.css({transform: 'rotate('+hAngle+'deg)'});
		
		// Check date every second. Init on first call
		date.setTime( date.getTime() + 1000 ); // Add 1 second
		// date.setTime( date.getTime() + 1000 + 1000*60*60*24 ); // test : 1 jour par seconde
		
		if(date.getDate() !== d){
			d = date.getDate();
			wd = date.getDay();
			
			$dNeedle.attr('data-time', 'd'+wd);
			$day.text((d < 10 ? '0' : '') + d);
		}
	}
	
	// Setup
	updateChrono();
	
	// Activer les transitions / Adoucit le rendu
	$('.needle').addClass('eased');
	
	// Update chaque seconde
	setInterval(function() {
		updateChrono();
	}, secondDuration);
	
});