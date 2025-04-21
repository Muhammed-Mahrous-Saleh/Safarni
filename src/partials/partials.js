import $ from "jquery";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

$(document).ready(() => {
    // navbar scrolling behavior
    let scrollPos = 0;
    const $mainNav = $("#mainNav");
    const headerHeight = $mainNav.outerHeight();

    $(window).on("scroll", function () {
        const currentTop = $(document).scrollTop();

        if (currentTop < scrollPos) {
            if (currentTop > 0 && $mainNav.hasClass("is-fixed")) {
                $mainNav.addClass("is-visible");
            } else {
                $mainNav.removeClass("is-visible is-fixed");
            }
        } else {
            $mainNav.removeClass("is-visible");
            if (currentTop > headerHeight && !$mainNav.hasClass("is-fixed")) {
                $mainNav.addClass("is-fixed");
            }
        }

        scrollPos = currentTop;
    });

    // footer year
    const yearSpan = $("#currentYear");
    if (yearSpan) {
        yearSpan.text(new Date().getFullYear());
    }

    // navbar links visibility based on page type
    const path = window.location.pathname;
    const isTripPage = path.includes("trip");
    const isMainPage =
        path.endsWith("index.html") || path === "/" || path === "";

    const mainOnlyLinks = $(".main-only");
    const tripOnlyLinks = $(".trip-only");

    if (isTripPage) {
        mainOnlyLinks.hide();
        tripOnlyLinks.show();
    } else {
        mainOnlyLinks.show();
        tripOnlyLinks.hide();
    }
});

// leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const coordinates = [26.416691, 43.898653];
const mapElement = document.getElementById("map");

if (mapElement) {
    const map = L.map("map").setView(coordinates, 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
    }).addTo(map);

    L.marker(coordinates).addTo(map).bindPopup("سفرني للرحلات").openPopup();
}
