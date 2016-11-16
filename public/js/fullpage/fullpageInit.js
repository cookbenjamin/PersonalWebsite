$(document).ready(function () {
	$('#fullpage').fullpage({
		sectionSelector: '.vertical-scrolling',
		anchors:['home', 'contact', 'blog'],
		menu: '#menu',
		scrollOverflow: true,
		scrollBar: false,
		onLeave: function (index, nextIndex, direction) {
			// GOOGLE ANALYTICS TRACKING
			// todo uncomment to track goals
			/*var leavingSection = $(this);

			 //after leaving section 2
			 if (nextIndex == 1) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedHome')
			 alert("Going to section 1!");
			 }
			 else if (nextIndex == 2) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedProjects')
			 alert("Going to section 2!");
			 }
			 else if (nextIndex == 3) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedExperience')
			 alert("Going to section 3!");
			 }
			 else if (nextIndex == 4) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedEducation')
			 alert("Going to section 4!");
			 }
			 else if (nextIndex == 5) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedContact')
			 alert("Going to section 5!");
			 }*/
		}
	});
});
$(document).ready(function () {
	$('#projectfullpage').fullpage({
		sectionSelector: '.vertical-scrolling',
		anchors: ['home', 'idea', 'algorithm', 'code'],
		menu: '#menu',
		scrollOverflow: true,
		scrollBar: false,
		onLeave: function (index, nextIndex, direction) {
			// GOOGLE ANALYTICS TRACKING
			// todo uncomment to track goals
			/*var leavingSection = $(this);

			 //after leaving section 2
			 if (nextIndex == 1) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedHome')
			 alert("Going to section 1!");
			 }
			 else if (nextIndex == 2) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedProjects')
			 alert("Going to section 2!");
			 }
			 else if (nextIndex == 3) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedExperience')
			 alert("Going to section 3!");
			 }
			 else if (nextIndex == 4) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedEducation')
			 alert("Going to section 4!");
			 }
			 else if (nextIndex == 5) {
			 ga('send', 'event', 'CV', 'viewedSection', 'viewedContact')
			 alert("Going to section 5!");
			 }*/
		}
	});
});
