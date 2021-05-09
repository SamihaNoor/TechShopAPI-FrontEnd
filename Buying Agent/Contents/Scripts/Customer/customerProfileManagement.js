$(document).ready(function() {
    showCustomerProfile();
    $("#cartQuantity").html(Cookies.get('cartQuantity'));

    function showCustomerProfile() {
        var credentials = Cookies.get('user_email') + ":" + Cookies.get('user_password');
        $.ajax({
            url: "http://localhost:8081/Api/Customers/" + Cookies.get('user_id'),
            method: "GET",
            headers: { "Authorization": "Basic " + btoa(credentials) },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    $("#customerShortDetails").html("");
                    $("#customerShortDetails").html("<h5>" + data.fullName + "</h5><h6>" + data.email + "</h6><h6>" + data.phone + "</h6>");
                    //$("#customerProPic").attr("src", data.profilePic)
                    $("#customerDetailsTable tr:nth-child(1) td:nth-child(2)").html(data.fullName);
                    $("#customerDetailsTable tr:nth-child(2) td:nth-child(2)").html(data.email);
                    $("#customerDetailsTable tr:nth-child(3) td:nth-child(2)").html(data.phone);
                    $("#customerDetailsTable tr:nth-child(4) td:nth-child(2)").html(data.address);
                    $("#customerDetailsTable tr:nth-child(5) td:nth-child(2)").html(data.joiningDate);
                    if (data.profilePic == null) {
                        $("#customerProPic").attr("src", "../../../Contents/vendor/Images/default_product_pic.png");
                    } else {
                        $("#customerProPic").attr("src", "D:Programs/C#/Final Term Project/TechShopAPI/TechShopCFAPI/TechShopCFAPI/Contents/Customer/ProfilePicture/" + Cookies.get('user_profilePic'));
                    }
                } else {
                    alert("Please login!");
                    window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
                }
            }
        })
    }
})