// import "fontawesome/css/fontawesome.min.css";
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

const coordinates = [26.416691, 43.898653];

const map = L.map("map").setView(coordinates, 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
}).addTo(map);

L.marker(coordinates).addTo(map).bindPopup("سفرني للرحلات").openPopup();
