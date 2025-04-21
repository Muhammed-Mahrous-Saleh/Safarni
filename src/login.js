import $ from "jquery";

$(document).ready(function () {
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
                .siblings(".invalid-feedback")
                .text("يرجى إدخال كلمة المرور")
                .addClass("show")
                .show();
            isValid = false;
        } else {
            password.addClass("is-valid");
        }

        if (!isValid) return;

        const isLoginSuccessful = false;

        if (!isLoginSuccessful) {
            email.removeClass("is-valid");
            password.removeClass("is-valid");

            $("#loginForm").prepend(`
        <div id="formError" class="alert alert-danger text-center">
          البريد الإلكتروني أو كلمة المرور غير صحيحة
        </div>
      `);
        }
    });
});
