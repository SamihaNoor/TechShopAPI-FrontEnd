$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    if (Cookies.get('user_credentials') == null || Cookies.get('user_credentials') == undefined) {
        alert('Please login first!')
        window.location.href = "../../../Views/Customer/CustomerLogin/Index.html";
    }
    var selectedShippingMethod = null;
    loadCart();
    loadPaymentDetails();
    var currentDate = new Date();

    function loadCart() {
        $("#cartQuantity").html(Cookies.get('cartQuantity'));
        var cart = JSON.parse(localStorage.getItem("cart"));
        var totalPrice = 0;
        var tax = 0;
        var discount = 0;
        var subtotal = 0;
        var subDiscount = 0;
        var subTax = 0;
        var flag = false;

        if (cart != null || cart != undefined) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i] != null) {

                    tax = ((cart[i].sellingPrice * cart[i].selectedQuantity) * (cart[i].tax * cart[i].selectedQuantity) / 100);
                    discount = ((cart[i].sellingPrice * cart[i].selectedQuantity) * (cart[i].discount * cart[i].selectedQuantity) / 100);
                    totalPrice = (cart[i].sellingPrice * cart[i].selectedQuantity) + tax - discount;
                    subtotal += totalPrice;
                    subDiscount += discount;
                    subTax += tax;

                    $("#cartTableId tbody").append("<tr><td>P0-" + cart[i].id + "</td><td class='w-25'>" + cart[i].productName + "</td><td>" + cart[i].brand + "</td><td>" + cart[i].sellingPrice + " BDT</td><td>" + cart[i].selectedQuantity + "</td><td>" + discount.toFixed(2) + " BDT (" + cart[i].discount * cart[i].selectedQuantity + " %)</td><td>" + tax.toFixed(2) + " BDT (" + cart[i].tax * cart[i].selectedQuantity + " %)</td><td>" + totalPrice.toFixed(2) + " BDT</td></tr>");

                    tax = discount = totalPrice = 0;
                    flag = false;
                } else {
                    flag = true;
                }
            }
            $("#cartTableId tfoot tr:nth-child(1) td:nth-child(2)").html(subTax.toFixed(2) + " BDT");
            $("#cartTableId tfoot tr:nth-child(2) td:nth-child(2)").html(subDiscount.toFixed(2) + " BDT");
            $("#cartTableId tfoot tr:nth-child(3) td:nth-child(2)").html(subtotal.toFixed(2) + " BDT");
        }
    }

    function loadPaymentDetails() {
        var credentials = Cookies.get('user_credentials');
        $.ajax({
            url: "http://localhost:8081/Api/Customers/1/shipping",
            method: "GET",
            headers: "Content-Type:application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    $("#ShippingAddressId").val(data.shippingAddress);
                    $("#CardTypeId").val(data.cardType);
                    $("#CardNumberId").val(data.cardNumber);
                    $("#ExpirationMonthId").val(data.expirationMonth);
                    $("#ExpirationYearId").val(data.expirationYear);
                    $("#ShippingMethodId").val(data.shippingMethod);
                    $("#ShippingMethodId").on("change", function() {
                        selectedShippingMethod = this.value;
                        if (selectedShippingMethod == "Cash on Delivery") {
                            // $("#ShippingMethodId").hide();
                            // $("#ExpirationYearId").hide();
                            // $("#ExpirationMonthId").hide();
                            // $("#CardNumberId").hide();
                            // $("#CardTypeId").hide();
                            // $("#CardTypeId").hide();
                            $("#paymentTableId tr:nth-child(5)").hide();
                            $("#paymentTableId tr:nth-child(5)").hide();
                            $("#paymentTableId tr:nth-child(6)").hide();
                            $("#paymentTableId tr:nth-child(7)").hide();
                            $("#paymentTableId tr:nth-child(8)").hide();
                        } else if (selectedShippingMethod == "Card Payment") {
                            $("#paymentTableId tr:nth-child(5)").show();
                            $("#paymentTableId tr:nth-child(5)").show();
                            $("#paymentTableId tr:nth-child(6)").show();
                            $("#paymentTableId tr:nth-child(7)").show();
                            $("#paymentTableId tr:nth-child(8)").show();
                        }
                    })
                } else {
                    console.log("Failed to get data" + xmlHttp.status)
                }
            }
        });
        $.ajax({
            url: "http://localhost:8081/Api/Customers/" + Cookies.get('user_id'),
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(credentials)
            },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    $("#CustomerFullNameId").val(data.fullName);
                    $("#PhoneId").val(data.phone);
                } else {
                    console.log("Failed to get data" + xmlHttp.status);
                }
            }
        })
    }

    $("#confirmPaymentBtn").click(function() {
        var shippingAddress = $("#ShippingAddressId").val();
        var cardType = $("#CardTypeId").val();
        var cardNumber = $("#CardNumberId").val();
        var expirationMonth = $("#ExpirationMonthId").val();
        var expirationYear = $("#ExpirationYearId").val();
        var shippingMethod = $("#ShippingMethodId").val();
        var customerName = $("#CustomerFullNameId").val();
        var phone = $("#PhoneId").val();

        var paymentData = {
            shippingAddress: shippingAddress,
            customerName: customerName,
            phone: phone,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            cardNumber: cardNumber,
            cardType: cardType
        };
        var cart = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < cart.length; i++) {

            tax = ((cart[i].sellingPrice * cart[i].selectedQuantity) * (cart[i].tax * cart[i].selectedQuantity) / 100);
            discount = ((cart[i].sellingPrice * cart[i].selectedQuantity) * (cart[i].discount * cart[i].selectedQuantity) / 100);
            totalPrice = (cart[i].sellingPrice * cart[i].selectedQuantity) + tax - discount;

            var sellsData = {
                "userId": Cookies.get('user_id'),
                "customerName": customerName.substring(0, 19),
                "customerAddress": shippingAddress.substring(0, 19),
                "customerPhoneNo": phone,
                "productId": cart[i].id,
                "dateSold": currentDate.toJSON(),
                "quantity": cart[i].selectedQuantity,
                "discount": discount.toFixed(2),
                "tax": tax.toFixed(2),
                "totalPrice": totalPrice.toFixed(2),
                "status": "Pending",
                "profits": (totalPrice - cart[i].buyingPrice).toFixed(2)
            };

            $.ajax({
                url: "http://localhost:8081/Api/BuyProducts",
                method: "POST",
                headers: "Content-Type:application/json",
                data: sellsData,
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 201) {
                        console.log("Successfully posted sales data!");
                    } else {
                        console.log("Failed to post sell data" + xmlHttp.status);
                    }
                }
            });

            cart[i].quantity = cart[i].quantity - cart[i].selectedQuantity;

            $.ajax({
                url: "http://localhost:8081/Api/CustomerProducts/" + Cookies.get('user_id'),
                method: "PUT",
                headers: "Content-Type:application/json",
                data: cart[i],
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        console.log("Successfully updated product quantity");
                    } else {
                        console.log("Failed to update product quantity " + xmlHttp.status);
                    }
                }
            })
        }
        alert("Order confirmed!");
        localStorage.removeItem("cart");
        Cookies.remove('cartQuantity');
        window.location.href = "../../../Views/Customer/CustomerProfile/PurchaseHistory.html";
    })
});