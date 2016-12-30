/**
 * Constructor for the site object.
 * All custom code for this site will go under this object
 */
function site() {

}

/**
 * Function to open and close the main navigation menu.
 * It toggles the classes causing the hamburger to animate,
 * and the menu to become visible and interactable
 */
site.toggleMenu = function() {
    $("#navigation").toggleClass("open");
    $(".btn").toggleClass("open");
};

/**
 * Function to scroll down one section.
 */
site.moveSectionDown = function() {
    $.fn.fullpage.moveSectionDown();
};

/**
 * Function to show the scroll arrow.
 */
site.hideArrow = function() {
    $(".arrow").addClass("hidden")
};

/**
 * Function to hide the scroll arrow.
 */
site.showArrow = function() {
    $(".arrow").removeClass("hidden")
};