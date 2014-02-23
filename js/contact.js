/**
 * Controller for contact info which provides a simple cipher to avoid spambots
 */

function ContactCtrl($scope) {
	var rot13 = function(msg) {
		return msg.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
	}

	$scope.linkedin = function() {
		return rot13('uggc://jjj.yvaxrqva.pbz/cho/wbfrcu-znyvxfv/35/o/903');
	}

	$scope.gmail = function() {
		return rot13('wbr.znyvxfv@tznvy.pbz');
	}

	$scope.email = function() {
		return rot13('wbr@wbfrcuznyvxfv.pbz');
	}

	$scope.facebook = function() {
		return rot13('uggcf://jjj.snprobbx.pbz/wbr.znyvxfv');
	}
}
