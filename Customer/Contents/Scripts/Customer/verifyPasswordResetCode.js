$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    if (Cookies.get('verificationCode') == null || Cookies.get('verificationCode') == undefined) {
        window.location.href = "../../../Views/Customer/CustomerPassword/Index.html";
    } else {
        var verificationCode = Cookies.get('verificationCode');
        $("#verifyBtnId").click(function() {
            var givenVerificationCode = $("#verificationCodeId").val();
            if (givenVerificationCode == verificationCode) {
                window.location.href = "../../../Views/Customer/CustomerPassword/ResetPassword.html";
            } else {
                alert("Invalid verification code!");
            }
        });
    }
})