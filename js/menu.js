/**
 * Responsive navbar
 */

var ResponsiveNavbar = function() {

	function initSmallMenu() {
		$(window).scroll(onResizeOrScroll);

		$('#goto').click(function(ev) {
			$('#navigation li').show();
		});
		//$('#navigation li').show();
	}

	function onResizeOrScroll(ev) {
		if ($('#goto').css('display') === "none") {
			// bigger than a tablet
			$('#navigation li').show();
			return;
		}
		if ($(window).scrollTop() > 3) {
			$('#navigation li').hide();
		} else {
			$('#navigation li').show();
		}
	}

	function init() {
		initSmallMenu();
		$(window).resize(onResizeOrScroll);
	}

	return {
		init:init,
	};
}();
