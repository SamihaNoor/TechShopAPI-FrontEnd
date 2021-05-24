$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    showCustomerProfile();
    var customerProfileData = null;
    var currentDate = new Date();

    function showCustomerProfile() {
        var credentials = Cookies.get('user_email') + ":" + Cookies.get('user_password');

        $.ajax({
            url: "http://localhost:1485/Api/Customers/" + Cookies.get('user_id'),
            method: "GET",
            headers: { "Authorization": "Basic " + btoa(credentials) },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    console.log(data);
                    customerProfileData = data;
                    $("#customerShortDetails").html("");
                    $("#customerShortDetails").html("<h5>" + data.fullName + "</h5><h6>" + data.email + "</h6><h6>" + data.phone + "</h6>");
                    Cookies.set('user_password', data.password);
                } else {
                    alert("Please login!");
                    Cookies.remove("user_id");
                    Cookies.remove("user_email");
                    Cookies.remove("user_name");
                    Cookies.remove("user_status");
                    Cookies.remove("user_password");
                    Cookies.remove("user_credentials");
                    localStorage.removeItem('cart');
                    Cookies.remove("user_profilePic");
                    Cookies.remove('userProfilePicSet');
                    window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
                }
            }
        })
    }
    $("#changePassBtn").click(function() {
        changePassword();
    });

    function changePassword() {
        var currentPassword = $("#currentPasswordId").val();
        var newpassword = $("#newPasswordId").val();
        var confirmNewPassword = $("#confirmNewPasswordId").val();
        if (currentPassword == "" || newpassword == "" || confirmNewPassword == "") {
            $("#msg").html("Please fillup all the inputs correctly!");
        } else if (currentPassword != Cookies.get('user_password')) {
            $("#msg").html("Incorrect current password!");
        } else if (newpassword != confirmNewPassword) {
            $("#msg").html("New password and confirmation did not match!");
        } else {
            $.ajax({
                url: "http://localhost:1485/Api/Customers/" + Cookies.get('user_id'),
                method: "PUT",
                headers: "Content-Type: application/json",
                data: {
                    "fullName": customerProfileData.fullName,
                    "userName": customerProfileData.userName,
                    "password": newpassword,
                    "email": customerProfileData.email,
                    "profilePic": customerProfileData.profilePic,
                    "phone": customerProfileData.phone,
                    "address": customerProfileData.address,
                    "status": customerProfileData.status,
                    "joiningDate": customerProfileData.joiningDate,
                    "lastUpdated": currentDate.toJSON()
                },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("Updated Customer Password!");
                        window.location.href = "Index.html";
                    } else {
                        $("#msg").html("Failed to update password!");
                        alert("Failed to update password!");
                        window.location.reload();
                    }
                }
            });
        }
    }
})