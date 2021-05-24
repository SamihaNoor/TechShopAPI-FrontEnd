$(document).ready(function() {
    var customerData = null;
    var currentDate = new Date();
    showCustomerProfile();
    $("#cartQuantity").html(Cookies.get('cartQuantity'));

    function showCustomerProfile() {
        var credentials = Cookies.get('user_email') + ":" + Cookies.get('user_password');
        $.ajax({
            url: "http://localhost:1485/Api/Customers/" + Cookies.get('user_id'),
            method: "GET",
            headers: { "Authorization": "Basic " + btoa(credentials) },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    customerData = data;
                    console.log(data);
                    $("#customerShortDetails").html("");
                    $("#customerShortDetails").html("<h5>" + data.fullName + "</h5><h6>" + data.email + "</h6><h6>" + data.phone + "</h6>");
                    $("#fullNameId").val(data.fullName);
                    $("#userNameId").val(data.userName);
                    $("#emailId").val(data.email);
                    $("#phoneId").val(data.phone);
                    $("textarea").val(data.address);
                    Cookies.set('user_password', data.password);
                } else {
                    alert("Please login!");
                    window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
                }
            }
        })
    }


    $("#profileUpdateBtn").on("click", function() {
        var FullName = $("#fullNameId").val();
        var UserName = $("#userNameId").val();
        var Phone = $("#phoneId").val();
        var Address = $("#addressId").val();

        if (FullName == "" || UserName == "" || Phone == "" || Address == "") {
            $("msg").html("Please fillup all the fields!");
        } else {
            $.ajax({
                url: "http://localhost:1485/Api/Customers/1",
                method: "PUT",
                headers: "Content-Type: application/json",
                data: {
                    "fullName": FullName,
                    "userName": UserName,
                    "email": customerData.email,
                    "password": customerData.password,
                    "profilePic": customerData.profilePic,
                    "phone": Phone,
                    "address": Address,
                    "status": customerData.status,
                    "joiningDate": customerData.joiningDate,
                    "lastUpdated": currentDate.toJSON()
                },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("Updated Customer data!");
                        window.location.href = "Index.html";
                    } else {
                        $("#msg").html("Failed to update shipping data!");
                        alert("Failed to update shipping data!" + xmlHttp.status);
                        window.location.reload();
                    }
                }
            });
        }
    })
})