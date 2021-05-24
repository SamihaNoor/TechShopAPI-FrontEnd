$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    $("#submitEmailBtnId").on("click", function() {
        var email = $("#emailId").val();
        var verificationCode = null;
        var userID = null;
        console.log(email);
        if (email == "") {
            alert("Please enter a registered email address!");
        } else if (email.length > 50 || email.length < 10) {
            alert("Email must be min. 10 characters and maximum 50 characters!");
        } else {
            $.ajax({
                url: "http://localhost:1485/Api/Customers/CheckValidEmail",
                method: "POST",
                headers: "Content-Type:application/json",
                data: { "email": email },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        var detailsString = xmlHttp.responseJSON;
                        var res = detailsString.split(":");
                        verificationCode = res[0];
                        userID = res[1];

                        Cookies.set("verificationCode", verificationCode);
                        Cookies.set('email', email);
                        Cookies.set('user_id', userID);

                        alert("An email has been sent to your account!");
                        window.location.href = "../../../Views/Customer/CustomerPassword/VerifyCode.html";
                    } else if (xmlHttp.status == 204) {
                        alert("The given email address is not registered!");
                    } else {
                        console.log("Failed to get data" + xmlHttp.status);
                    }
                }
            });
        }
    })
});