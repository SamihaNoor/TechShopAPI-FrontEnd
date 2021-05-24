$(document).ready(function() {

    $('#profilePictureUploadBtnId').on('click', function() {

        var data = new FormData();

        var files = $("#imageUploadPickerId").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        if (files.length >= 1) {
            // Make Ajax request with the contentType = false, and procesDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "http://localhost:1485/Api/Customers/" + Cookies.get('user_id') + "/UploadProfilePicture",
                contentType: false,
                processData: false,
                data: data
            });

            ajaxRequest.done(function(xhr, textStatus) {
                if (textStatus == "success") {
                    $("#msg").html("Upload profile picture successfully!");
                    alert("Uploaded profile picture successfully!");
                    Cookies.set('user_profilePicSet', "false");
                    window.location.reload();
                } else if (xhr.status == 400) {
                    $("#msg").html("Please select an image first!");
                } else {
                    $("#msg").html("Failed to upload profile picture!");
                }
            });
        } else {
            alert("Please select an image first!");
        }
    });

    $("#removeProfilePictureBtnId").click(function() {
        if (Cookies.get('user_profilePicSet') == "true") {
            alert("No image is uploaded yet to remove!");
        } else {
            $.ajax({
                url: "http://localhost:1485/Api/Customers/" + Cookies.get('user_id') + "/RemoveProfilePicture",
                method: "PUT",
                complete: function(xmlHttp, status) {
                    if (xmlHttp.status == 200) {
                        alert("Profile picture removed successfully!");
                        Cookies.set('user_profilePicSet', "true");
                        window.location.reload();
                    } else if (xmlHttp.status == 400) {
                        alert("Please select an image first!")
                    } else if (xmlHttp.status == 304) {
                        alert("Failed to remove profile picture!")
                    } else {
                        console.log("Failed to remove profile picture!" + xmlHttp.status);
                    }
                }
            })
        }
    })
});