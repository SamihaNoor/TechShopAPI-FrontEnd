$(document).ready(function() {
    //alert('Hi');
    $.ajax({
        url: "http://localhost:8081/Api/CustomerProducts/GetAllCategories",
        method: "GET",
        headers: "Content-Type:application/json",
        complete: function(xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var categories = xmlHttp.responseJSON;
                //console.log(categories);
                for (var i = 0; i < categories.length; i++) {
                    $("#categoryDropDown").append("<option value='" + categories[i] + "'>" + categories[i] + "</option>");
                }
            } else if (xmlHttp.status == 204) {
                alert('No categories found!')
            } else {
                console.log("Failed to get categories!" + xmlHttp.status);
            }
        }
    });
    $("#productTable > tbody").html("");
    $("#productTable2 > tbody").html("");

    $("#categoryDropDown").on("change", function() {
        //alert(this.value);

        $("#productTable > tbody").html("");
        $("#productTable2 > tbody").html("");
        $("#product1SelectBox").html("");
        $('#product1SelectBox').each(function() {
            $(this).html("");
        });
        $('#product2SelectBox').each(function() {
            $(this).html("");
        });

        $.ajax({
            type: "GET",
            url: "http://localhost:8081/Api/CustomerProducts/GetProductsByCategory/" + this.value,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                var mydata = result;
                //console.log(mydata);
                $('#product1SelectBox').append(`<option value="" disabled selected>Select Product</option>`);
                $('#product2SelectBox').append(`<option value="" disabled selected>Select Product</option>`);
                for (var i = 0; i < mydata.length; i++) {
                    optionText = mydata[i].productName;
                    optionValue = mydata[i].id;
                    $('#product1SelectBox').append(`<option value="${optionValue}">${optionText}</option>`);
                    $('#product2SelectBox').append(`<option value="${optionValue}">${optionText}</option>`);
                }
            }
        });
    });

    $("#product2SelectBox").on("change", function() {
        //alert(this.value);
        $.ajax({
            type: "GET",
            url: "http://localhost:8081/Api/CustomerProducts/" + this.value,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                var mydata = result;
                //console.log(mydata);
                $("#productTable2 > tbody").html("");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Product Name : </b></td><td>" + mydata.productName + "</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Product Image : </b></td><td><img id='imageBox2' src='' ></td></tr>");
                // $("#imageBox2").attr({
                //     "src": mydata.Images
                // });
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Product Category : </b></td><td>" + mydata.category + "</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Brand : </b></td><td>" + mydata.brand + "</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Description : </b></td><td>" + mydata.productDescription + "</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Discount : </b></td><td>" + mydata.discount + "%</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Tax : </b></td><td>" + mydata.tax + "%</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Availability : </b></td><td>" + mydata.status + "</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Stock : </b></td><td>" + mydata.quantity + " Pcs</td></tr>");
                $("#productTable2 > tbody").append("<tr><td class='w-25'><b>Unit Price : </b></td><td>" + mydata.sellingPrice + " BDT</td></tr>");
                $("#productTable2 > tbody").append("<tr><td colspan='2'><a class='btn btn-block btn-primary btn-sm' href='../../Customer/Products/Index.html?productId=" + mydata.id + "'>View Product</a></td></tr>");
            }
        });
    });

    $("#product1SelectBox").on("change", function() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8081/Api/CustomerProducts/" + this.value,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result) {
                var mydata = result;
                $("#productTable > tbody").html("");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Product Name : </b></td><td>" + mydata.productName + "</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Product Image : </b></td><td><img id='imageBox' src='' ></td></tr>");
                // $("#imageBox").attr({
                //     "src": mydata.Images
                // });
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Product Category : </b></td><td>" + mydata.category + "</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Brand : </b></td><td>" + mydata.brand + "</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Description : </b></td><td>" + mydata.productDescription + "</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Discount : </b></td><td>" + mydata.discount + "%</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Tax : </b></td><td>" + mydata.tax + "%</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Availability : </b></td><td>" + mydata.status + "</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Stock : </b></td><td>" + mydata.quantity + " Pcs</td></tr>");
                $("#productTable > tbody").append("<tr><td class='w-25'><b>Unit Price : </b></td><td>" + mydata.sellingPrice + " BDT</td></tr>");
                $("#productTable > tbody").append("<tr><td colspan='2'><a class='btn btn-block btn-primary btn-sm' href='../../Customer/Products/Index.html?productId=" + mydata.id + "'>View Product</a></td></tr>");
            }
        });
    });
})