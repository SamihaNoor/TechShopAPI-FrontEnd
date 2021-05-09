$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    var url_string = null;
    var url = null;
    var productId = null;
    var date = new Date();
    var currentDate = new Date();
    var viewedProduct = null;
    var rate = 0;
    try {
        url_string = (window.location.href).toLowerCase();
        url = new URL(url_string);
        productId = url.searchParams.get("productid");
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }

    loadProduct();
    getProductAverageRating();

    function loadProduct() {
        loadAllReviews();
        $.ajax({
            url: "http://localhost:8081/Api/CustomerProducts/" + productId,
            type: "GET",
            contentType: "application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    viewedProduct = data;
                    var discount = ((data.sellingPrice * data.discount) / 100);
                    var tax = ((data.sellingPrice * data.tax) / 100);
                    $("#prouductDetailsTable tr:nth-child(1) td:nth-child(2)").html(data.productName);
                    $("#prouductDetailsTable tr:nth-child(2) td:nth-child(2)").html(data.productDescription);
                    $("#prouductDetailsTable tr:nth-child(3) td:nth-child(2)").html(data.status);
                    $("#prouductDetailsTable tr:nth-child(4) td:nth-child(2)").html(data.brand);
                    $("#prouductDetailsTable tr:nth-child(5) td:nth-child(2)").html(data.sellingPrice.toFixed(2) + " BDT");
                    $("#prouductDetailsTable tr:nth-child(6) td:nth-child(2)").html(discount.toFixed(2) + " BDT (" + data.discount + " %)");
                    $("#prouductDetailsTable tr:nth-child(7) td:nth-child(2)").html(tax.toFixed(2) + " BDT (" + data.tax + " %)");
                    $("#prouductDetailsTable tr:nth-child(8) td:nth-child(2)").html((data.sellingPrice - discount + tax).toFixed(2) + " BDT");
                    if (data.status != "In Stock") {
                        $("#addToCartBtn").text("Currently Unavailable");
                        $("#addToCartBtn").prop("disabled", true);
                    } else {
                        $("#addToCartBtn").val(data.id);
                        $("#addToWishBtn").val(data.id);
                        addToRecentlyViewedProducts();
                    }
                    $("#addToWishBtn").on("click", function() {
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
                } else {
                    alert("Product not found!");
                    window.location.href = "../../../Views/Customer/Home/Index.html";
                }
            }

        })
    }
    $("#postReviewBtn").click(function() {
        var body = $("#reviewTB").val();
        if (body == "") {
            alert("Please write a review!")
        } else {
            $.ajax({
                url: "http://localhost:8081/Api/Reviews",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    "Body": body,
                    "CustomerId": Cookies.get('user_id'),
                    "ProductId": productId,
                    "DatePosted": date.toJSON()
                },
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 201) {
                        alert("Review posted!");
                        window.location.reload();
                    } else if (xmlHttp.status == 403) {
                        alert("You have already reviewed the product!");
                    } else {
                        alert("Failed to post review!" + xmlHttp.status);
                    }
                }
            });
        }
    });

    function loadAllReviews() {
        var userId = Cookies.get('user_id');
        if (userId == undefined) {
            userId = 1;
        }
        $.ajax({
            url: "http://localhost:8081/Api/CustomerProducts/" + userId + "/Product/" + productId,
            method: "GET",
            headers: "Content-Type: application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    for (var i = 0; i < data.length; i++) {
                        $("#reviewSection").append("<div class='col-12'><div class='list-group'><a class='list-group-item list-group-item-action flex-column align-items-start'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'></h5><small>" + data[i].datePosted + "</small></div><p class='mb-1 border-top'>" + data[i].body + "</p></a></div><br /></div>");
                    }
                } else {
                    //alert("No review found!");
                }
            }
        });
    }


    function addToRecentlyViewedProducts() {
        var flag = false;
        if (localStorage.getItem("recentlyViewedProducts") == undefined || localStorage.getItem("recentlyViewedProducts") == null) {
            localStorage.setItem("recentlyViewedProducts", JSON.stringify([viewedProduct]));
        } else {
            var recentlyViewedProducts = JSON.parse(localStorage.getItem("recentlyViewedProducts"));
            if (recentlyViewedProducts != null) {
                for (var i = 0; i < recentlyViewedProducts.length; i++) {
                    if (recentlyViewedProducts[i].id == productId) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }
                }
            }
            if (flag == false) {
                recentlyViewedProducts.push(viewedProduct);
                localStorage.setItem("recentlyViewedProducts", JSON.stringify(recentlyViewedProducts));
            } else {
                console.log("Already viewedProduct!");
            }
        }
    }

    $(function() {

        $("#rateYo").rateYo({
            rating: 0
        });

        $("#rateYo").rateYo()
            .on("rateyo.set", function(e, data) {
                var UserId = $("#UserId").data("value");
                var ProductId = 1;
                rate = Math.round(data.rating);
                //alert("The rating is set to " + rate + "!");

                $.ajax({
                    url: "http://localhost:8081/Api/Rating",
                    method: "POST",
                    headers: "Content-Type:application/json",
                    data: {
                        "CustomerId": Cookies.get('user_id'),
                        "ProductId": productId,
                        "RatingPoint": rate,
                        "DateRated": currentDate.toJSON()
                    },
                    complete: function(xmlHttp, status) {
                        if (xmlHttp.status == 201) {
                            alert("Rating Posted successfully!")
                        } else if (xmlHttp.status == 403) {
                            alert("You have already rated the product!")
                        } else {
                            console.log("Failed to rate product: " + xmlHttp.status);
                        }
                    }
                })
            });
    });

    function getProductAverageRating() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8081/Api/CustomerProducts/" + productId + "/Rating",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                var rate = JSON.parse(result);
                //console.log(rate.Value);
                $("#prouductDetailsTable tr:nth-child(9) td:nth-child(2)").html(rate.Value.toFixed(2) + " / 5");
            }
        })
    }
})