import $ from "jquery";

(function ($) {
    $.fn.togglePasswordVisibility = function () {
        this.each(function () {
            const container = $(this);
            const input = container.find("input");
            const toggleBtn = container.find(".toggle-input");
            const icon = toggleBtn.find("i");

            toggleBtn.on("click", function () {
                const type =
                    input.attr("type") === "password" ? "text" : "password";
                input.attr("type", type);
                icon.toggleClass("fa-eye fa-eye-slash");
            });
        });

        return this;
    };
})($);
