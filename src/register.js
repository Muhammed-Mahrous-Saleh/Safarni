import $ from "jquery";
import "./utils/togglePasswordPlugin.js";

$(document).ready(function () {
    $(".password-toggle-group").togglePasswordVisibility();
    $("#password").on("input", function () {
        const val = $(this).val();
        const message = getPasswordStrengthMessage(val);
        $("#passwordStrengthMessage").text(message);
    });

    function getPasswordStrengthMessage(password) {
        if (!password) return "";
        const requirements = [];
        if (password.length < 8) requirements.push("8 أحرف على الأقل");
        if (!/[a-zA-Z]/.test(password)) requirements.push("حرف واحد على الأقل");
        if (!/[0-9]/.test(password)) requirements.push("رقم واحد على الأقل");
        if (!/[^a-zA-Z0-9]/.test(password))
            requirements.push("رمز مميز واحد على الأقل");

        return requirements.length === 0
            ? "كلمة المرور قوية"
            : "يجب أن تحتوي على: " + requirements.join("، ");
    }
    const messages = {
        required: "هذا الحقل مطلوب",
        invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
        passwordLength: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
        passwordLetter: "كلمة المرور يجب أن تحتوي على حرف واحد على الأقل",
        passwordNumber: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل",
        passwordSymbol: "كلمة المرور يجب أن تحتوي على رمز مميز واحد على الأقل",
        passwordMismatch: "تأكيد كلمة المرور لا يطابق كلمة المرور",
        underage: "يجب أن يكون عمرك 16 سنة على الأقل",
    };

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        const fullName = $("#fullName");
        const dob = $("#dob");
        const email = $("#email");
        const password = $("#password");
        const confirmPassword = $("#confirmPassword");

        $(".form-control").removeClass("is-valid is-invalid");
        $(".invalid-feedback").text("");

        if (!fullName.val().trim()) {
            showError(fullName, messages.required);
            isValid = false;
        } else {
            showSuccess(fullName);
        }

        if (!dob.val()) {
            showError(dob, messages.required);
            isValid = false;
        } else if (!isAtLeast16(dob.val())) {
            showError(dob, messages.underage);
            isValid = false;
        } else {
            showSuccess(dob);
        }

        if (!email.val().trim()) {
            showError(email, messages.required);
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email.val())) {
            showError(email, messages.invalidEmail);
            isValid = false;
        } else {
            showSuccess(email);
        }

        const pass = password.val();
        const errors = [];

        if (!pass) {
            errors.push(messages.required);
        } else {
            if (pass.length < 8) errors.push(messages.passwordLength);
            if (!/[a-zA-Z]/.test(pass)) errors.push(messages.passwordLetter);
            if (!/[0-9]/.test(pass)) errors.push(messages.passwordNumber);
            if (!/[^a-zA-Z0-9]/.test(pass))
                errors.push(messages.passwordSymbol);
        }

        if (errors.length > 0) {
            showError(password, errors[0]);
            isValid = false;
        } else {
            showSuccess(password);
        }

        if (!confirmPassword.val()) {
            showError(confirmPassword, messages.required);
            isValid = false;
        } else if (confirmPassword.val() !== pass) {
            showError(confirmPassword, messages.passwordMismatch);
            isValid = false;
        } else {
            showSuccess(confirmPassword);
        }

        if (isValid) {
            const submitBtn = $("#registerForm button[type='submit']");

            submitBtn
                .prop("disabled", true)
                .html(`<i class="fas fa-spinner fa-spin"></i>`);

            setTimeout(() => {
                submitBtn.prop("disabled", false).html("إنشاء الحساب");

                const successModal = $(`
                    <div id="successMessage" class="alert alert-success text-center position-fixed top-0 translate-middle-x mt-3 shadow" style="z-index: 1050; width: fit-content; padding: 1rem 2rem;">
                      <i class="fas fa-check-circle me-2"></i>&nbsp;تم&nbsp;إنشاء&nbsp;الحساب&nbsp;بنجاح&nbsp;🎉
                    </div>
                  `);

                $("body").append(successModal);

                setTimeout(() => {
                    successModal.fadeOut(500, function () {
                        $(this).remove();
                    });
                }, 2000);
            }, 2000);

            setTimeout(() => {
                window.location.href = "login.html";
            }, 5000);
        }
    });

    function isAtLeast16(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return age > 16 || (age === 16 && m >= 0);
    }

    function showError(input, message) {
        input.addClass("is-invalid");
        if (input.attr("id").toLowerCase().includes("password")) {
            input.parent().siblings(".invalid-feedback").text(message).show();
        } else {
            input.siblings(".invalid-feedback").text(message).show();
        }
    }

    function showSuccess(input) {
        input.addClass("is-valid");
    }
});
