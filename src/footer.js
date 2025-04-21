import $ from "jquery";

$(document).ready(() => {
    const yearSpan = $("#currentYear");
    if (yearSpan) {
        yearSpan.text(new Date().getFullYear());
    }
});
