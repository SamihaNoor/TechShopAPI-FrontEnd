$(document).ready(function() {
    loadPurchaseHistory();
    $("#cartQuantity").html(Cookies.get('cartQuantity'));

    function loadPurchaseHistory() {
        $.ajax({
            url: "http://localhost:8081/Api/BuyProducts/GetPurchasedDataByCustomerId/" + Cookies.get("user_id"),
            method: "GET",
            headers: "Content-Type:application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    for (var i = 0; i < data.length; i++) {
                        tax = ((data[i].unitPrice * data[i].quantity) * (data[i].tax * data[i].quantity) / 100);
                        discount = ((data[i].unitPrice * data[i].quantity) * (data[i].discount * data[i].quantity) / 100);
                        totalPrice = (data[i].unitPrice * data[i].quantity) + tax - discount;
                        totalPrice = totalPrice.toFixed(2);
                        if (data[i].status == "Pending") {
                            $("#pendingPurchaseHistoryTableId tbody").append("<tr><td>" + data[i].productName + "</td><td>" + data[i].quantity + " Pcs</td><td>" + data[i].unitPrice + " BDT</td><td>" + tax + " BDT</td><td>" + discount + " BDT</td><td>" + totalPrice + " BDT</td><td>" + data[i].soldDate.substring(0, 10) + "</td><td>" + data[i].status + "</td><td><button value='" + data[i].id + "' class='cancelOrderBtnId btn btn-danger btn-sm btn-block'>Cancel Order</button></td></tr>");
                        } else if (data[i].status == "Cancelled") {
                            $("#cancelledPurchaseHistoryTableId tbody").append("<tr><td>" + data[i].productName + "</td><td>" + data[i].quantity + " Pcs</td><td>" + data[i].unitPrice + " BDT</td><td>" + tax + " BDT</td><td>" + discount + " BDT</td><td>" + totalPrice + " BDT</td><td>" + data[i].soldDate.substring(0, 10) + "</td><td>" + data[i].status + "</td></tr>");
                        } else {
                            $("#purchaseHistoryTableId tbody").append("<tr><td>" + data[i].productName + "</td><td>" + data[i].quantity + " Pcs</td><td>" + data[i].unitPrice + " BDT</td><td>" + tax + " BDT</td><td>" + discount + " BDT</td><td>" + totalPrice + " BDT</td><td>" + data[i].soldDate.substring(0, 10) + "</td><td>" + data[i].status + "</td></tr>");
                        }
                    }
                    $(".cancelOrderBtnId").click(function() {
                        var flag = window.confirm("Are you sure you want to cancel this order?");
                        if (flag == true) {
                            cancelOrder(this.value);
                        }
                    })
                } else {
                    console.log("Failed to load data " + xmlHttp.status);
                }
            }
        })
    }

    function loadGraphs() {

    }

    function cancelOrder(e) {
        $.ajax({
            url: "http://localhost:8081/Api/BuyProducts/" + e + "/CancelOrder",
            method: "GET",
            headers: "Content-Type: application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    alert("Cancelled the order!");
                    window.location.reload();
                } else if (xmlHttp.status == 406) {
                    alert("The order cannot be cancelled now!");
                } else if (xmlHttp.status == 404) {
                    alert("Order is not found!");
                } else {
                    alert("Failed to cancel the order!");
                }
            }
        })
    }
})