$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:1485/Api/CustomerProducts/GetAllProductsName",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            var tags = result;
            //console.log(tags);
            $('#searchBox').autocomplete({
                source: tags,
                select: showResult
            })

            function showResult(event, ui) {
                var name = ui.item.label;
                console.log(name);
                $.ajax({
                    type: "GET",
                    url: "http://localhost:1485/Api/CustomerProducts/" + name + "/Product",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        var productId = JSON.parse(result).Value;
                        //console.log(productId);
                        window.location.href = "../../Customer/Products/Index.html?productId=" + productId;
                    }
                });
            }
        }
    });
});