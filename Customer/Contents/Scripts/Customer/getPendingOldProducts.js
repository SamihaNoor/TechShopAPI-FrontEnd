$(document).ready(function() {
    var data = null;
    $.ajax({
        url: "http://localhost:1485/Api/SellProducts/GetAllPendingOldProductsByCustomerId/" + Cookies.get('user_id'),
        method: "GET",
        headers: "Content-Type:application/json",
        complete: function(xmlHttp, status) {
            if (xmlHttp.status == 200) {
                console.log(xmlHttp.responseJSON);
                data = xmlHttp.responseJSON;
                for (var i = 0; i < data.length; i++) {
                    $("#pendingPostTableId").append("<tr><td>P-00" + data[i].id + "</td><td>" + data[i].productName + "</td><td>" + data[i].category + "</td><td>" + data[i].brand + "</td><td>" + data[i].sellingPrice + "</td><td>" + data[i].images + "</td><td>" + data[i].status + "</td><td colspan='2''><button value='" + data[i].id + "' class='deletePostBtn btn btn-danger btn-sm btn-block'>Delete</button><a href='../../../Views/Customer/SellProducts/EditPost.html?oldProductId=" + data[i].id + "' class='btn btn-warning btn-sm btn-block'>Edit</a></td></tr>");
                }

                $(".deletePostBtn").on("click", function() {
                    var r = window.confirm("Are you sure you want to delete this post?");
                    if (r == true) {
                        $.ajax({
                            url: "http://localhost:1485/Api/SellProducts/" + this.value,
                            method: "DELETE",
                            complete: function(xmlHttp, status) {
                                if (xmlHttp.status == 204) {
                                    alert("Successfully deleted the post!");
                                    window.location.reload();
                                } else {
                                    alert("Failed to delete the post!" + xmlHttp.status);
                                }
                            }
                        })
                    }
                })
            } else if (xmlHttp.status == 204) {
                alert("No pending post found!");
            } else {
                alert("Failed to get data" + xmlHttp.status);
            }
        }
    })
})