$(document).ready(function() {
    checkCustomerLoggedIn();
    $("#cartQuantity").html(Cookies.get('cartQuantity'));

    function checkCustomerLoggedIn() {
        if (Cookies.get("user_id") != null && Cookies.get("user_status") == "Active") {
            $(".showToLogginInCustomer").show();
            $(".hideToLogginInCustomer").hide();
        } else {
            $(".showToLogginInCustomer").hide();
            $(".hideToLogginInCustomer").show();
        }
    }

    $("#logOutBtn").on("click", function() {
        customerLogOut();
    })

    function customerLogOut() {
        Cookies.remove("user_id");
        Cookies.remove("user_email");
        Cookies.remove("user_name");
        Cookies.remove("user_status");
        Cookies.remove("user_password");
        Cookies.remove("user_credentials");
        localStorage.removeItem('cart');
        Cookies.remove("user_profilePic");
        Cookies.remove('user_profilePicSet');
        window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
    }
});