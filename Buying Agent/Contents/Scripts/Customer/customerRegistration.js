$(document).ready(function() {
    $("#registrationBtn").on("click", function() {

        var fullName = document.forms["customerRegistrationForm"]["fullName"].value;
        var userName = document.forms["customerRegistrationForm"]["userName"].value;
        var email = document.forms["customerRegistrationForm"]["email"].value;
        var password = document.forms["customerRegistrationForm"]["password"].value;
        var confirmPassword = document.forms["customerRegistrationForm"]["confirmPassword"].value;
        var phone = document.forms["customerRegistrationForm"]["phone"].value;
        var address = document.forms["customerRegistrationForm"]["address"].value;

        if (fullName == "" || fullName.length < 1) {
            document.getElementById('msg').innerHTML = "*Full Name can not be empty!";
            return false;
        } else if (phone == "" || phone.length < 1) {
            document.getElementById('msg').innerHTML = "*Phone can not be empty!";
            return false;
        } else if (address == "" || address.length < 1) {
            document.getElementById('msg').innerHTML = "*Address can not be empty!";
            return false;
        } else if (password == "" || password.length < 1) {
            document.getElementById('msg').innerHTML = "*Password can not be empty!";
            return false;
        } else if (confirmPassword == "" || confirmPassword.length < 1) {
            document.getElementById('msg').innerHTML = "*Confirm Password can not be empty!";
            return false;
        } else if (password !== confirmPassword) {
            document.getElementById('msg').innerHTML = "*Passwords did not match!";
            return false;
        } else if (password == "" || password.length < 1) {
            document.getElementById('msg').innerHTML = "*Password can not be empty!";
            return false;
        } else if (userName == "" || userName.length < 1) {
            document.getElementById('msg').innerHTML = "*User Name can not be empty!";
            return false;
        } else if (email == "" || email.length < 1) {
            document.getElementById('msg').innerHTML = "*Email can not be empty!";
            return false;
        } else {
            var date = new Date();
            $.ajax({
                url: "http://localhost:8081/Api/Customers",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    "FullName": fullName,
                    "UserName": userName,
                    "Password": password,
                    "Email": email,
                    "Phone": phone,
                    "Address": address,
                    "ProfilePic": null,
                    "Status": "Active",
                    "JoiningDate": date.toJSON(),
                    "LastUpdated": date.toJSON()
                },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 201) {
                        //$("#msg").html(xmlHttp.status + ":" + xmlHttp.statusText);
                        $("#msg").html("Customer Registration Successful!");
                        alert("Congratulations,Your registration is successful!\nYou will be redirected to the login page now!");
                        window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
                    } else {
                        $("#msg").html("Failed to register user! " + xmlHttp.status + ":" + xmlHttp.statusText);
                        alert("Failed to register Customer!");
                    }
                }
            });
        }
    });
});