import $ from "jquery";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const navLinksByPage = {
    main: [
        { text: "الصفحة الرئيسية", href: "index.html" },
        { text: "عنّا", href: "index.html#about" },
        { text: "خدماتنا", href: "index.html#services" },
        { text: "الرحلات", href: "index.html#trips" },
        { text: "تواصل معنا", href: "#contactUs" },
        { text: "تسجيل الدخول", href: "login.html", class: "btn login_btn" },
    ],
    trip: [
        { text: "الصفحة الرئيسية", href: "index.html" },
        { text: "عن الرحلة", href: "#about-trip" },
        { text: "المزارات", href: "#places" },
        { text: "تواصل معنا", href: "#contactUs" },
        { text: "تسجيل الدخول", href: "login.html", class: "btn login_btn" },
    ],
};

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
    generateNavLinks(isTripPage ? "trip" : "main");
});

function generateNavLinks(type) {
    const navLinks = navLinksByPage[type] || [];
    const $navContainer = $("#dynamicNav");
    $navContainer.empty();

    navLinks.forEach((link) => {
        const $li = $("<li>").addClass("nav-item");
        const $a = $("<a>")
            .addClass("nav-link px-lg-3 py-3 py-lg-4")
            .attr("href", link.href)
            .text(link.text);

        if (link.class) {
            $a.removeClass("nav-link px-lg-3 py-3 py-lg-4").addClass(
                link.class
            );
            $li.addClass("login");
        }

        $li.append($a);
        $navContainer.append($li);
    });
}

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
