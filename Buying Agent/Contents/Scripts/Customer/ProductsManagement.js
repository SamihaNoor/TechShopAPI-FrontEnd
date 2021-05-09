$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    loadAllProducts();
    var allProducts = null;
    var currentDate = new Date();

    function loadAllProducts() {
        //var allProducts = null;
        $.ajax({
            url: 'http://localhost:8081/Api/CustomerProducts',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                //console.log(data);
                allProducts = data;
                var featuredcount = 0;
                for (var i = data.length - 1; i > 0; i--) {
                    if (featuredcount < 6) {
                        $("#featuredRow").append("<div class='col-12 col-lg-3 m-2 col-md-5 ml-3 border border-secondary rounded'><div class='text-center mt-2 mb-2'><img class='featured-product-img' src='../../../Contents/vendor/Images/default_product_pic.png' /><h5>" + data[i].productName + "</h5></div><div class='text-left border-top border-secondary'><p><span><b>Price :</b> " + data[i].sellingPrice + " BDT</span><br /><span><b>Discount :</b> " + ((data[i].discount * data[i].sellingPrice) / 100) + " BDT  (" + data[i].discount + " %)</span><br /><span><b>Availability:</b>" + data[i].status + "</span><br /></p></div><div class='border-top border-secondary pb-2 text-center'><button type='button' value='" + data[i].id + "' class='addToWishBtn btn btn-sm btn-success btn-block mt-2 mb-2'>Add to Wishlist</button><a href='../../../Views/Customer/Products/Index.html?productId=" + data[i].id + "' class='viewProductBtn btn-sm btn-primary btn-block'>View Product</a></div></div>");
                    }
                    featuredcount++;
                }
                var upcomingcount = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].status == "Up Coming") {
                        if (upcomingcount < 6) {
                            $("#upComingRow").append("<div class='col-12 col-lg-3 m-2 col-md-5 ml-3 border border-secondary rounded'><div class='text-center mt-2 mb-2'><img class='featured-product-img' src='../../../Contents/vendor/Images/default_product_pic.png' /><h5>" + data[i].productName + "</h5></div><div class='text-left border-top border-secondary'><p><span><b>Price :</b> " + data[i].sellingPrice + " BDT</span><br /><span><b>Discount :</b> " + ((data[i].discount * data[i].sellingPrice) / 100) + " BDT  (" + data[i].discount + " %)</span><br /><span><b>Availability:</b>" + data[i].status + "</span><br /></p></div><div class='border-top border-secondary pb-2 text-center'><button type='button' value='" + data[i].id + "' class='addToWishBtn btn btn-sm btn-success btn-block mt-2 mb-2'>Add to Wishlist</button><a href='../../../Views/Customer/Products/Index.html?productId=" + data[i].id + "' class='viewProductBtn btn-sm btn-primary btn-block'>View Product</a></div></div>");
                        }
                        upcomingcount++;
                    }
                }
                loadRecentlyViewedProducts();
                $(".addToWishBtn").on("click", function() {
                    productId = this.value;
                    if (Cookies.get('user_credentials') == null || Cookies.get('user_credentials') == undefined) {
                        alert("Please login first to add product to your wish list!");
                    } else {
                        $.ajax({
                            url: "http://localhost:8081/Api/WishList",
                            method: "POST",
                            headers: "Content-Type:application/json",
                            data: {
                                "CustomerId": Cookies.get('user_id'),
                                "ProductId": productId,
                                "DateWished": currentDate.toJSON()
                            },
                            complete: function(xmlHttp, status) {
                                if (xmlHttp.status == 201) {
                                    alert("Product is added to wish list!");
                                } else if (xmlHttp.status == 400) {
                                    alert("Failed to add product to wish list!")
                                } else if (xmlHttp.status == 403) {
                                    alert("The product is already in your wish list!");
                                } else {
                                    console.log(xmlHttp.status);
                                }
                            }
                        })
                    }
                })
            }
        })
    }

    function loadRecentlyViewedProducts() {
        var recentlyViewedProducts = JSON.parse(localStorage.getItem("recentlyViewedProducts"));
        for (var i = 0; i < recentlyViewedProducts.length; i++) {
            $("#recentlyViewedRow").append("<div class='col-12 col-lg-3 m-2 col-md-5 ml-3 border border-secondary rounded'><div class='text-center mt-2 mb-2'><img class='featured-product-img' src='../../../Contents/vendor/Images/default_product_pic.png' /><h5>" + recentlyViewedProducts[i].productName + "</h5></div><div class='text-left border-top border-secondary'><p><span><b>Price :</b> " + recentlyViewedProducts[i].sellingPrice + " BDT</span><br /><span><b>Discount :</b> " + ((recentlyViewedProducts[i].discount * recentlyViewedProducts[i].sellingPrice) / 100) + " BDT  (" + recentlyViewedProducts[i].discount + " %)</span><br /><span><b>Availability:</b>" + recentlyViewedProducts[i].status + "</span><br /></p></div><div class='border-top border-secondary pb-2 text-center'><button type='button' value='" + recentlyViewedProducts[i].id + "' class='addToWishBtn btn btn-sm btn-success btn-block mt-2 mb-2'>Add to Wishlist</button><a href='../../../Views/Customer/Products/Index.html?productId=" + recentlyViewedProducts[i].id + "' class='viewProductBtn btn-sm btn-primary btn-block'>View Product</a></div></div>");
        }
    }
})