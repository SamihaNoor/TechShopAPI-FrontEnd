$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    $("#sellPostBtnId").on("click", function() {
        var productName = $("#productNameId").val();
        var productDescription = $("#productDescriptionId").val();
        var quantity = $("#quantityId").val();
        var category = $("#categoryId").val();
        var brand = $("#brandId").val();
        var features = $("#featuresId").val();
        var sellingPrice = $("#sellingPriceId").val();

        if (productName == "") {
            $("#msg").html("Product name is required!");
        } else if (productDescription == "") {
            $("#msg").html("Product description is required!");
        } else if (quantity == "") {
            $("#msg").html("Quantity is required!");
        } else if (category == "") {
            $("#msg").html("Category is required!");
        } else if (brand == "") {
            $("#msg").html("Brand is required!");
        } else if (features == "") {
            $("#msg").html("Features is required!");
        } else if (sellingPrice == "") {
            $("#msg").html("Price is required!");
        } else {
            $.ajax({
                url: "http://localhost:1485/Api/SellProducts",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    "customerId": Cookies.get('user_id'),
                    "productName": productName,
                    "productDescription": productDescription,
                    "status": "Pending",
                    "buyingPrice": 0,
                    "sellingPrice": sellingPrice,
                    "category": category,
                    "brand": brand,
                    "features": features,
                    "quantity": quantity,
                    "images": "abc",
                    "discount": 0,
                    "tax": 0
                },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 201) {
                        alert("Posted item for sell!");
                        window.location.href = "../../../Views/Customer/SellProducts/PendingSellPosts.html";
                    } else {
                        alert("Failed to post product!" + xmlHttp.status);
                    }
                }
            })
        }
    });
})