import $ from "jquery";

$(document).ready(function () {
    const $gallery = $(".trip-gallery");
    let autoScroll;

    $("#scrollLeft").on("click", function () {
        $gallery.animate({ scrollLeft: "-=300" }, 400);
    });

    $("#scrollRight").on("click", function () {
        $gallery.animate({ scrollLeft: "+=300" }, 400);
    });

    function autoScrollGallery() {
        const scrollAmount = 260;
        const scrollWidth = $gallery.prop("scrollWidth");
        const visibleWidth = $gallery.width();
        let currentScroll = $gallery.scrollLeft();

        const maxScroll = scrollWidth - visibleWidth;
        const isAtEnd = Math.abs(currentScroll - maxScroll) <= 10;

        if (isAtEnd) {
            $gallery.animate({ scrollLeft: 0 }, 600);
        } else {
            $gallery.animate({ scrollLeft: currentScroll + scrollAmount }, 600);
        }
    }

    function startAutoScroll() {
        autoScroll = setInterval(autoScrollGallery, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    $gallery.on("mouseenter", stopAutoScroll);
    $gallery.on("mouseleave", startAutoScroll);

    startAutoScroll();
});
