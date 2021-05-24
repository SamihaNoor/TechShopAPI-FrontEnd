$(document).ready(function() {
    var url_string = null;
    var url = null;
    var productId = null;
    var currentDate = new Date();
    var totalCartQuantity = 0;

    try {
        url_string = (window.location.href).toLowerCase();
        url = new URL(url_string);
        productId = url.searchParams.get("productid");
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
    }

    loadCart();

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

                    if (cart[i].selectedQuantity == 1) {
                        $("#cartTableId tbody").append("<tr><td>P0-" + cart[i].id + "</td><td class='w-25'>" + cart[i].productName + "</td><td>" + cart[i].brand + "</td><td>" + cart[i].sellingPrice + " BDT</td><td><select name='quantityDropDown' class='quantityDropDownId form-control'><option selected value='" + cart[i].id + "'>1</option><option value='" + cart[i].id + "'>2</option><option value='" + cart[i].id + "'>3</option><option value='" + cart[i].id + "'>4</option><option value='" + cart[i].id + "'>5</option></select></td><td>" + discount.toFixed(2) + " BDT (" + cart[i].discount * cart[i].selectedQuantity + " %)</td><td>" + tax.toFixed(2) + " BDT (" + cart[i].tax * cart[i].selectedQuantity + " %)</td><td>" + totalPrice.toFixed(2) + " BDT</td><td><button class='text-light btn btn-block btn-sm btn-danger removeProductBtn' value='" + cart[i].id + "'>Remove</button></td></tr>");
                    } else if (cart[i].selectedQuantity == 2) {
                        $("#cartTableId tbody").append("<tr><td>P0-" + cart[i].id + "</td><td class='w-25'>" + cart[i].productName + "</td><td>" + cart[i].brand + "</td><td>" + cart[i].sellingPrice + " BDT</td><td><select name='quantityDropDown' class='quantityDropDownId form-control'><option value='" + cart[i].id + "'>1</option><option selected value='" + cart[i].id + "'>2</option><option value='" + cart[i].id + "'>3</option><option value='" + cart[i].id + "'>4</option><option value='" + cart[i].id + "'>5</option></select></td><td>" + discount.toFixed(2) + " BDT (" + cart[i].discount * cart[i].selectedQuantity + " %)</td><td>" + tax.toFixed(2) + " BDT (" + cart[i].tax * cart[i].selectedQuantity + " %)</td><td>" + totalPrice.toFixed(2) + " BDT</td><td><button class='text-light btn btn-block btn-sm btn-danger removeProductBtn' value='" + cart[i].id + "'>Remove</button></td></tr>");
                    } else if (cart[i].selectedQuantity == 3) {

                        $("#cartTableId tbody").append("<tr><td>P0-" + cart[i].id + "</td><td class='w-25'>" + cart[i].productName + "</td><td>" + cart[i].brand + "</td><td>" + cart[i].sellingPrice + " BDT</td><td><select name='quantityDropDown' class='quantityDropDownId form-control'><option value='" + cart[i].id + "'>1</option><option value='" + cart[i].id + "'>2</option><option selected value='" + cart[i].id + "'>3</option><option value='" + cart[i].id + "'>4</option><option value='" + cart[i].id + "'>5</option></select></td><td>" + discount.toFixed(2) + " BDT (" + cart[i].discount * cart[i].selectedQuantity + " %)</td><td>" + tax.toFixed(2) + " BDT (" + cart[i].tax * cart[i].selectedQuantity + " %)</td><td>" + totalPrice.toFixed(2) + " BDT</td><td><button class='text-light btn btn-block btn-sm btn-danger removeProductBtn' value='" + cart[i].id + "'>Remove</button></td></tr>");
                    } else if (cart[i].selectedQuantity == 4) {
                        $("#cartTableId tbody").append("<tr><td>P0-" + cart[i].id + "</td><td class='w-25'>" + cart[i].productName + "</td><td>" + cart[i].brand + "</td><td>" + cart[i].sellingPrice + " BDT</td><td><select name='quantityDropDown' class='quantityDropDownId form-control'><option value='" + cart[i].id + "'>1</option><option value='" + cart[i].id + "'>2</option><option value='" + cart[i].id + "'>3</option><option selected value='" + cart[i].id + "'>4</option><option value='" + cart[i].id + "'>5</option></select></td><td>" + discount.toFixed(2) + " BDT (" + cart[i].discount * cart[i].selectedQuantity + " %)</td><td>" + tax.toFixed(2) + " BDT (" + cart[i].tax * cart[i].selectedQuantity + " %)</td><td>" + totalPrice.toFixed(2) + " BDT</td><td><button class='text-light btn btn-block btn-sm btn-danger removeProductBtn' value='" + cart[i].id + "'>Remove</button></td></tr>");
                    } else if (cart[i].selectedQuantity == 5) {
                        $("#cartTableId tbody").append("<tr><td>P0-" + cart[i].id + "</td><td class='w-25'>" + cart[i].productName + "</td><td>" + cart[i].brand + "</td><td>" + cart[i].sellingPrice + " BDT</td><td><select name='quantityDropDown' class='quantityDropDownId form-control'><option value='" + cart[i].id + "'>1</option><option value='" + cart[i].id + "'>2</option><option value='" + cart[i].id + "'>3</option><option value='" + cart[i].id + "'>4</option><option selected value='" + cart[i].id + "'>5</option></select></td><td>" + discount.toFixed(2) + " BDT (" + cart[i].discount * cart[i].selectedQuantity + " %)</td><td>" + tax.toFixed(2) + " BDT (" + cart[i].tax * cart[i].selectedQuantity + " %)</td><td>" + totalPrice.toFixed(2) + " BDT</td><td><button class='text-light btn btn-block btn-sm btn-danger removeProductBtn' value='" + cart[i].id + "'>Remove</button></td></tr>");
                    }

                    tax = discount = totalPrice = 0;
                    flag = false;
                } else {
                    flag = true;
                }
            }
        } else {
            flag = true;
        }

        if (flag == true) {
            $("#dontShowIfCartEmptyId").hide();
            $(".msg").html("Your Cart is empty!");
            Cookies.remove('cartQuantity');
            localStorage.removeItem('cart');
        } else {
            $("#dontShowIfCartEmptyId").show();
        }

        $(".removeProductBtn").click(function() {
            var text = null;
            var r = confirm("Are you sure you want to remove the product?");
            if (r == true) {
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i] != null) {
                        if (cart[i].id == this.value) {
                            Cookies.set('cartQuantity', (parseInt(Cookies.get("cartQuantity")) - parseInt(cart[i].selectedQuantity)), { expires: (1 / 24) });
                            delete cart[i];
                            localStorage.setItem('cart', JSON.stringify(cart));
                            window.location.reload();
                        }
                    }
                }
            }
        })

        $(".quantityDropDownId").on("change", function() {
            var value = $(this).children("option:selected").text();
            var id = $(this).children("option:selected").val();

            for (var i = 0; i < cart.length; i++) {
                if (cart[i] != null) {
                    if (cart[i].id == id) {
                        if (cart[i].quantity > value) {
                            Cookies.set('cartQuantity', (parseInt(Cookies.get("cartQuantity")) - parseInt(cart[i].selectedQuantity)));
                            cart[i].selectedQuantity = value;
                            Cookies.set('cartQuantity', (parseInt(Cookies.get("cartQuantity")) + parseInt(cart[i].selectedQuantity)));
                        } else {
                            alert("Select less quantity! Not much in stock!");
                        }
                    }
                }

            }

            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload();
        })
        $("#cartTableId tfoot tr:nth-child(1) td:nth-child(2)").html(subTax.toFixed(2) + " BDT");
        $("#cartTableId tfoot tr:nth-child(2) td:nth-child(2)").html(subDiscount.toFixed(2) + " BDT");
        $("#cartTableId tfoot tr:nth-child(3) td:nth-child(2)").html(subtotal.toFixed(2) + " BDT");
    }

    $("#addToCartBtn").click(function() {
        $.ajax({
            url: "http://localhost:1485/Api/CustomerProducts/" + this.value,
            method: "GET",
            headers: "Content-Type:application/json",
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var selectedProduct = xmlHttp.responseJSON;
                    selectedProduct.selectedQuantity = 1;

                    if (selectedProduct.quantity > selectedProduct.selectedQuantity) {
                        if (localStorage.getItem("cart") == undefined) {
                            var cart = [selectedProduct];
                            localStorage.setItem('cart', JSON.stringify(cart));
                            $("#cartQuantity").html(Cookies.get('cartQuantity'));
                            if (Cookies.get('cartQuantity') == undefined || Cookies.get('cartQuantity') == null) {
                                Cookies.set('cartQuantity', 1, { expires: (1 / 24) });
                                $("#cartQuantity").html(1);
                            } else {
                                Cookies.set('cartQuantity', (parseInt(Cookies.get("cartQuantity") + 1)), { expires: (1 / 24) });
                                $("#cartQuantity").html(1);
                            }
                            alert('Added the product to your cart!');
                        } else {
                            var cart = JSON.parse(localStorage.getItem('cart'));
                            var flag = true;
                            for (var i = 0; i < cart.length; i++) {
                                if (cart[i] != null) {

                                    if (cart[i].id == selectedProduct.id) {
                                        flag = false;
                                    } else {
                                        flag = true;
                                    }
                                }
                            }
                            if (flag == true) {
                                cart.push(selectedProduct);
                                localStorage.setItem('cart', JSON.stringify(cart));
                                alert('Added the product to your cart!');
                                totalCartQuantity += Cookies.get("cartQuantity");
                                totalCartQuantity++;
                                Cookies.set('cartQuantity', totalCartQuantity, { expires: (1 / 24) });
                                $("#cartQuantity").html(Cookies.get('cartQuantity'));

                            } else {
                                alert("Already the product is in your cart!");
                            }
                        }
                    } else {
                        alert("Please select less than " + selectedProduct.selectedQuantity + " pcs. Not much stock left!");
                    }
                } else {
                    console.log("Proudct not found!" + xmlHttp.status)
                }
            }
        })
    })
})