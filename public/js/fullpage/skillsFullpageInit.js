window.mobilecheck = function() {
	return $(window).width() < 1001;
};

function initialiseFullpage() {
	$('#fullpage').fullpage({
		sectionSelector: '.vertical-scrolling',
		anchors: ['home', 'code', 'web', 'data', 'tools', 'contact'],
		menu: '#menu',
		responsiveWidth: 1000,
		afterLoad: function(anchorLink, index, slideAnchor, slideIndex){

			// if(index == 4){
			// 	site.hideArrow();
			// }
		},
		onLeave: function(index, nextIndex, direction){
			// hide arrow if in contact section
			if (nextIndex == 6) {
				site.hideArrow();
			}
			// show arrow if leaving contact section
			if(index == 6){
				site.showArrow();
			}
		}
	});
}

$(document).ready(function () {
	initialiseFullpage();
});

$(window).resize(function () {
	$(window).location.refresh();
});
