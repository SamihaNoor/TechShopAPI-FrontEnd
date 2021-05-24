$(document).ready(function() {
    loadWishedListProducts();
    $("#cartQuantity").html(Cookies.get('cartQuantity'));

    function loadWishedListProducts() {
        $.ajax({
            url: "http://localhost:1485/Api/WishList/1/Customer/" + Cookies.get('user_id'),
            method: "GET",
            headers: "Content-Type:application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        $("#wishedListRow").append("<div class='col-12 col-lg-4 m-2 col-md-5 ml-3 border border-secondary rounded'><div class='text-center mt-2 mb-2'><img class='featured-product-img' src='../../../Contents/vendor/Images/default_product_pic.png' /><h5>" + data[i].productName + "</h5></div><div class='text-left border-top border-secondary'><p><span><b>Price :</b>" + data[i].sellingPrice + " BDT</span><br /><span><b>Discount :</b>" + data[i].discount + " %</span><br /><span><b>Availability:</b>" + data[i].status + "</span><br /></p></div><div class='border-top border-secondary pb-2 text-center'><button type='button' value='" + data[i].id + "' class='removeFromWishListBtn btn btn-sm btn-danger btn-block mt-2 mb-2'>Remove from Wish List</button><a href='../../../Views/Customer/Products/Index.html?productId=" + data[i].id + "' class='viewProductBtn btn-sm btn-primary btn-block'>View Product</a></div></div>");
                    }
                    $(".removeFromWishListBtn").click(function() {
                        var flag = window.confirm("Are you sure you want to remove this product from wish list!");;
                        if (flag == true) {
                            $.ajax({
                                url: "http://localhost:1485/Api/WishList/1/Customer/" + Cookies.get('user_id') + "/Product/" + this.value,
                                method: "DELETE",
                                headers: "Content-Type:application/json",
                                complete: function(xmlHttp, status) {
                                    if (xmlHttp.status == 200) {
                                        alert("Removed product from wish list!");
                                        window.location.reload();
                                    } else if (xmlHttp.status == 404) {
                                        alert("Product Not Found!");
                                    } else {
                                        console.log("Failed to remove product from wish list! " + xmlHttp.status);
                                    }
                                }
                            })
                        }
                    })
                } else if (xmlHttp.status == 204) {
                    console.log("No contents!");
                } else {
                    console.log(xmlHttp.status);
                }
            }
        })
    }

    function removeFromWishList() {

    }
})