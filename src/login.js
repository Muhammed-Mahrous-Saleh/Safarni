import $ from "jquery";
import "./utils/togglePasswordPlugin.js";

$(document).ready(function () {
    $(".password-toggle-group").togglePasswordVisibility();
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const email = $("#email");
        const password = $("#password");

        let isValid = true;

        $(".invalid-feedback").removeClass("show").hide();
        email.removeClass("is-invalid is-valid");
        password.removeClass("is-invalid is-valid");
        $("#formError").remove();

        if (!email.val()) {
            email.addClass("is-invalid");
            email
                .siblings(".invalid-feedback")
                .text("يرجى إدخال البريد الإلكتروني")
                .addClass("show")
                .show();
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email.val())) {
            email.addClass("is-invalid");
            email
                .siblings(".invalid-feedback")
                .text("يرجى إدخال بريد إلكتروني صحيح")
                .addClass("show")
                .show();
            isValid = false;
        } else {
            email.addClass("is-valid");
        }

        if (!password.val()) {
            password.addClass("is-invalid");
            password
                .parent()
                .siblings(".invalid-feedback")
                .text("يرجى إدخال كلمة المرور")
                .addClass("show")
                .show();
            isValid = false;
        } else {
            password.addClass("is-valid");
        }

        if (!isValid) return;

        const submitBtn = $("#loginForm button[type='submit']");
        submitBtn
            .prop("disabled", true)
            .html(`<i class="fas fa-spinner fa-spin ms-2"></i>`);

        setTimeout(() => {
            const isLoginSuccessful = false;

            submitBtn.prop("disabled", false).html("دخول");

            if (!isLoginSuccessful) {
                email.removeClass("is-valid");
                password.removeClass("is-valid");

                $("#loginForm").prepend(`
      <div id="formError" class="alert alert-danger text-center">
        البريد الإلكتروني أو كلمة المرور غير صحيحة
      </div>
    `);
            }
        }, 2000);
    });
});
