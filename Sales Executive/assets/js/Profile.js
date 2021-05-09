$(document).ready(function(){
    var body = $("#load");
$.ajax({
    type: "get",
    url:"http://localhost:54047//api/SalesExecutive/Profile",
    datatype: 'json',
 

    complete:function(xmlHttp,status){
        if(xmlHttp.status == 200)
        {
           // var oldProducts = "<table border='1' id='oldProductsList' cellspacing='0'><tr><th>Customer ID</th><th>Product Name</th><th>Product Description</th><th>Requested Price</th><th>Category</th><th>Brand</th><th>Features</th><th>Quantity</th><th>Options</th></tr>";
            var profileData = xmlHttp.responseJSON;
            var profile;
            console.log(profileData.length);
            for (var i = 0; i < profileData.length; i++) {
               
                 profile="<table width='50'> <tr> <td>Full Name:</td> <td>"+profileData[i].FullName+"</td> </tr>   <tr> <td>Userame:</td> <td>"+profileData[i].UserName+"</td> </tr>   <tr> <td>Full Name:</td> <td>"+profileData[i].Email+"</td> </tr>  <tr> <td>Full Name:</td> <td>"+profileData[i].Phone+"</td>  <tr> <td>Full Name:</td> <td>"+profileData[i].Address+"</td> </tr> </tr>";
                     
            }
           // oldProducts += "</table>"
           body.append(profile);
        }
        else
        {
            $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
        }
    }


});
});
