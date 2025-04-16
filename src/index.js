import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "./scss/main.scss";
import "./js/main.js";

$(document).ready(function () {
    let scrollPos = 0;
    const $mainNav = $("#mainNav");
    const headerHeight = $mainNav.outerHeight();

    $(window).on("scroll", function () {
        const currentTop = $(document).scrollTop();

        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && $mainNav.hasClass("is-fixed")) {
                $mainNav.addClass("is-visible");
            } else {
                $mainNav.removeClass("is-visible is-fixed");
            }
        } else {
            // Scrolling Down
            $mainNav.removeClass("is-visible");
            if (currentTop > headerHeight && !$mainNav.hasClass("is-fixed")) {
                $mainNav.addClass("is-fixed");
            }
        }
        scrollPos = currentTop;
    });
});
