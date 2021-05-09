//$(document).ready(function () {
//    $("#categoryDropDown").on("change", function () {
//        alert("Hello");
//        alert(this.value);
//        mydata = JSON.stringify({ "Category": this.value, "Discount": 10.00 });

//        $.ajax({
//            type: "POST",
//            url: "/Products/GetProductsByCategory",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            data: mydata,
//            success: function (result) {
//                alert("Successfully rated " + JSON.stringify(result) + "!");
//                mydata = JSON.parse(result);
//                if (mydata.length > 1) {
//                    for (var i = 0; i < mydata.length; i++) {
//                        optionText = mydata[i].Key;
//                        optionValue = mydata[i].Value;
//                        $('#product1SelectBox').append(`<option value="${optionValue}"> 
//                                       ${optionText} 
//                                  </option>`);
//                        $('#product2SelectBox').append(`<option value="${optionValue}"> 
//                                       ${optionText} 
//                                  </option>`);
//                    }
//                }
//            }
//        });
//        $("#productTable > tbody").html("");
//        $("#product1SelectBox").html("");
//    });
//});

//$("#product1SelectBox").on("change", function () {
//    //alert(this.value);
//    mydata = JSON.stringify({ "Quantity": this.value});
//    $.ajax({
//        type: "POST",
//        url: "/Products/GetProductById",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: mydata,
//        success: function (result) {
//            //alert("Successfully rated " + JSON.stringify(result) + "!");
//            mydata = JSON.parse(result);
//            $("#productTable > tbody").html("");
//            $("#productTable > tbody").append("<tr><td><b>Product Name : </b></td><td>" + mydata.ProductName + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Product Category : </b></td><td>" + mydata.Category + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Brand : </b></td><td>" + mydata.Brand + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Description : </b></td><td>" + mydata.ProductDescription + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Discount : </b></td><td>" + mydata.Discount + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Tax : </b></td><td>" + mydata.Tax + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Availability : </b></td><td>" + mydata.Status + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Stock : </b></td><td>" + mydata.Quantity + "</td></tr>");
//            $("#productTable > tbody").append("<tr><td><b>Unit Price : </b></td><td>" + mydata.SellingPrice + "</td></tr>");
//        }
//    });
//});

