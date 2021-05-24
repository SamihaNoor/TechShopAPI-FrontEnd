$(document).ready(function() {
    $("#cartQuantity").html(Cookies.get('cartQuantity'));
    var date = new Date();
    $("#soldTable thead tr:nth-child(1) td:nth-child(1)").html("Date : " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    $.ajax({
        url: "http://localhost:1485/Api/SellProducts/GetAllSoldOldProductByCustomerId/" + Cookies.get('user_id'),
        method: "GET",
        complete: function(xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var soldData = xmlHttp.responseJSON;
                for (var i = 0; i < soldData.length; i++) {
                    $("#soldTable tbody").append("<tr> <td>P-00" + soldData[i].id + " </td> <td > " + soldData[i].productName + " </td> <td > " + soldData[i].category + "</td> <td> Brand </td> <td> " + soldData[i].sellingPrice + " BDT </td> <td > Image </td> <td > " + soldData[i].status + "</td> </tr>");
                }
            } else if (xmlHttp.status == 204) {
                alert("No products sold yet!");
            } else {
                alert("Failed to get data " + xmlHttp.status);
            }
        }
    });

    $(document).ready(function() {
        var soldData = Array();
        soldData.push(['Categories', 'Quantity (Pcs)']);
        $.ajax({
            type: 'GET',
            dataType: "json",
            contentType: "application/json",
            url: 'http://localhost:1485/Api/SellProducts/GetMostSoldCategoriesByCustomerId/' + Cookies.get('user_id'),
            success: function(result) {
                for (var i = 0; i < result.length; i++) {
                    soldData.push([result[i].key, result[i].value]);
                }
            }
        });

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(soldData);

            var options = {
                title: 'Your most sold product categories',
                pieHole: 0.4,
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
        }
    });
})