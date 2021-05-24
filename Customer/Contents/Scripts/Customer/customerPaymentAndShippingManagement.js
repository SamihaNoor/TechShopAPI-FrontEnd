$(document).ready(function() {
    var shippingData = null;
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
        $.ajax({
            url: "http://localhost:8081/Api/Customers/" + Cookies.get('user_id') + "/shipping",
            method: 'GET',
            headers: "Content-Type: application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    shippingData = xmlHttp.responseJSON;
                    var data = shippingData;
                    console.log(data);
                    $("#shippingDataTable tr:nth-child(1) td:nth-child(2)").html(data.cardType);
                    $("#shippingDataTable tr:nth-child(2) td:nth-child(2)").html(data.cardNumber);
                    $("#shippingDataTable tr:nth-child(3) td:nth-child(2)").html(data.expirationMonth);
                    $("#shippingDataTable tr:nth-child(4) td:nth-child(2)").html(data.expirationYear);
                    $("#shippingDataTable tr:nth-child(5) td:nth-child(2)").html(data.shippingMethod);
                    $("#shippingDataTable tr:nth-child(6) td:nth-child(2)").html(data.shippingAddress);

                    $("#CardTypeId").val(data.cardType);
                    $("#ShippingMethodId").val(data.shippingMethod);
                    $("#CardNumberId").val(data.cardNumber);
                    $("#ExpirationMonthId").val(data.expirationMonth);
                    $("#ExpirationYearId").val(data.expirationYear);
                    $("#ShippingAddressId").val(data.shippingAddress);
                } else {
                    alert(xmlHttp.status + " : " + xmlHttp.statusText);
                }
            }
        })
    }
    $("#updateBtn").click(function() {
        updateShippingData();
    })

    function updateShippingData() {
        if (shippingData != null) {
            var ID = shippingData.id;
            delete shippingData.id;
            delete shippingData.links;
            delete shippingData.customer;
            shippingData.cardNumber = $("#CardNumberId").val();
            shippingData.cardType = $("#CardTypeId").val();
            shippingData.expirationMonth = $("#ExpirationMonthId").val();
            shippingData.expirationYear = $("#ExpirationYearId").val();
            shippingData.shippingAddress = $("#ShippingAddressId").val();
            shippingData.shippingMethod = $("#ShippingMethodId").val();
            console.log(JSON.stringify(shippingData));
            $.ajax({
                url: "http://localhost:8081/Api/Shipping/" + ID,
                method: "PUT",
                headers: "Content-Type: application/json",
                data: { "customerId": Cookies.get('user_id'), "cardType": shippingData.cardType, "cardNumber": shippingData.cardNumber, "expirationYear": shippingData.expirationYear, "expirationMonth": shippingData.expirationMonth, "shippingMethod": shippingData.shippingMethod, "shippingAddress": shippingData.shippingAddress },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("Updated shipping data!");
                        window.location.reload();
                    } else {
                        $("#msg").html("Failed to update shipping data!");
                        alert("Failed to update shipping data!");
                        window.location.reload();
                    }
                }
            })
        } else {
            $("#msg").html("No data!");
        }
    }
})