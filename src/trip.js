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
});
