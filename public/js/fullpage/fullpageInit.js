window.mobilecheck = function() {
	return screen.width < 800;
};

$(document).ready(function () {
	if (window.mobilecheck()) {
		$('#fullpage').fullpage({
			sectionSelector: '.vertical-scrolling',
			anchors: ['home', 'projects', 'contact'],
			menu: '#menu',
			autoScrolling: false,
			fitToSection: false
		});
	} else {
		$('#fullpage').fullpage({
			sectionSelector: '.vertical-scrolling',
			anchors: ['home', 'projects', 'contact'],
			menu: '#menu',
		});
	}
});