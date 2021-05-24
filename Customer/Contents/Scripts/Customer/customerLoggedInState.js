$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    if (Cookies.get('user_id') == null || Cookies.get('user_id') == undefined) {
        alert('Please login first!')
        window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
    }
})