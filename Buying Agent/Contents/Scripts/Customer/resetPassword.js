$(document).ready(function() {
    if (Cookies.get('verificationCode') == null || Cookies.get('verificationCode') == undefined) {
        window.location.href = "../../../Views/Customer/CustomerPassword/Index.html";
    }

    $("#resetBtnId").click(function() {
        var newPassword = $("#newPasswordId").val();
        var confirmNewPassword = $("#confirmNewPasswordId").val();

        if (newPassword != confirmNewPassword) {
            $("#msg").html("Passwords did not match!");
        } else if (newPassword == "" || confirmNewPassword == "") {
            $("#msg").html("Please fillup all the fields!");
        } else if (newPassword.length < 3 || newPassword.length > 20) {
            $("#msg").html("Passwords lenght must be between 8 and 20!");
        } else if (confirmNewPassword.length < 3 || confirmNewPassword.length > 20) {
            $("#msg").html("Confirm passwords lenght must be between 8 and 20!");
        } else {
            $.ajax({
                url: "http://localhost:8081/Api/Customers/" + Cookies.get('user_id') + "/ResetPassword",
                method: "PUT",
                headers: "Content-Type: application/json",
                data: { "password": newPassword },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("Updated Customer Password Successfully!");
                        Cookies.remove('user_id');
                        Cookies.remove('email');
                        Cookies.remove('verificationCode');
                        window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
                    } else {
                        $("#msg").html("Failed to update password!");
                        alert("Failed to update password!");
                        window.location.reload();
                    }
                }
            });
        }
    })
})