$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    var url_string = null;
    var url = null;
    var oldProductId = null;
    var postData = null;
    try {
        url_string = (window.location.href).toLowerCase();
        url = new URL(url_string);
        oldProductId = url.searchParams.get("oldproductid");
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }
    $.ajax({
        url: "http://localhost:8081/Api/SellProducts/" + oldProductId,
        method: "GET",
        complete: function(xmlHttp, status) {
            if (xmlHttp.status == 200) {
                postData = xmlHttp.responseJSON;
                $("#editPostTableId tbody tr:nth-child(2) td:nth-child(2) input").val(postData.productName);
                $("#editPostTableId tbody tr:nth-child(2) td:nth-child(3) input").val(postData.images);
                $("#editPostTableId tbody tr:nth-child(4) td:nth-child(2) input").val(postData.productDescription);
                $("#editPostTableId tbody tr:nth-child(5) td:nth-child(2) input").val(postData.quantity);
                $("#editPostTableId tbody tr:nth-child(6) td:nth-child(2) input").val(postData.category);
                $("#editPostTableId tbody tr:nth-child(7) td:nth-child(2) input").val(postData.brand);
                $("#editPostTableId tbody tr:nth-child(8) td:nth-child(2) textarea").val(postData.features);
                $("#editPostTableId tbody tr:nth-child(9) td:nth-child(2) input").val(postData.sellingPrice);
            } else {
                console.log("Failed to get post " + xmlHttp.status);
            }
        }
    })

    $("#updatePostBtnId").click(function() {
        var productName = $("#editPostTableId tbody tr:nth-child(2) td:nth-child(2) input").val();
        var images = $("#editPostTableId tbody tr:nth-child(3) td:nth-child(2) input").val();
        var productDescription = $("#editPostTableId tbody tr:nth-child(4) td:nth-child(2) input").val();
        var quantity = $("#editPostTableId tbody tr:nth-child(5) td:nth-child(2) input").val();
        var category = $("#editPostTableId tbody tr:nth-child(6) td:nth-child(2) input").val();
        var brand = $("#editPostTableId tbody tr:nth-child(7) td:nth-child(2) input").val();
        var features = $("#editPostTableId tbody tr:nth-child(8) td:nth-child(2) textarea").val();
        var sellingPrice = $("#editPostTableId tbody tr:nth-child(9) td:nth-child(2) input").val();

        if (productName == "") {
            $("#msg").html("Product name is required!");
        } else if (productDescription == "") {
            $("#msg").html("Product name is required!");
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
            postData.productName = productName;
            postData.productDescription = productDescription;
            postData.quantity = quantity;
            postData.category = category;
            postData.brand = brand;
            postData.features = features;
            postData.sellingPrice = sellingPrice;
            console.log(postData);

            $.ajax({
                url: "http://localhost:8081/Api/SellProducts/" + oldProductId,
                method: "PUT",
                headers: "Content-Type:application/json",
                data: postData,
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("Updated post!");
                        window.location.href = "../../../Views/Customer/SellProducts/PendingSellPosts.html";
                    } else {
                        alert("Failed to update post!" + xmlHttp.status);
                    }
                }
            })
        }
    })
})