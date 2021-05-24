$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    $("#customerLoginBtn").click(function() {
        var email = document.forms["loginForm"]["email"].value;
        var password = document.forms["loginForm"]["password"].value;
        var credentials = email + ":" + password;

        if (email.length < 1 || email == "") {
            document.getElementById('msg').innerHTML = "*Email can not be empty!";
            return false;
        }
        if (password.length < 1 || password == "") {
            document.getElementById('msg').innerHTML = "*Password can not be empty!";
            return false;
        }
        if (email.length > 50 || email.length < 5) {
            document.getElementById('msg').innerHTML = "*Invalid email length!";
            return false;
        }
        if (password.length > 20 || password.length < 5) {
            document.getElementById('msg').innerHTML = "*Invalid password length!";
            return false;
        } else {
            $.ajax({
                url: "http://localhost:1485/Api/Customers/GetCustomerLoginValidation",
                method: "GET",

                headers: {
                    "Authorization": "Basic " + btoa(credentials)
                },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        var data = xmlHttp.responseJSON;
                        console.log(data);
                        Cookies.set('user_id', data.customerId);
                        Cookies.set('user_name', data.userName);
                        Cookies.set('user_email', data.email);
                        Cookies.set('user_status', data.status);
                        Cookies.set('user_password', data.password);
                        Cookies.set('user_credentials', credentials);
                        Cookies.set('user_profilePic', data.profilePic);

                        if (Cookies.get('user_status') === "Active") {
                            window.location.href = "../../../Views/Customer/Home/Index.html";
                        } else {
                            $("#msg").html("Sorry, You dont have permission to sign in currently!");
                            Cookies.remove('user_id');
                            Cookies.remove('user_name');
                            Cookies.remove('user_email');
                            Cookies.remove('user_status');
                        }
                    } else {
                        $("#msg").html("Invalid email or password!");
                    }
                }
            });
        }
    });
});