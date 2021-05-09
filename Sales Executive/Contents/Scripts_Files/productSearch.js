
$(document).ready(function(){
	$('#searchBox').on('keyup', function(){
        var searchText = $("#searchBox").val();
        if(searchText.trim()==''){
            $('#myTable tbody')=null;
        }
        console.log(searchText);
		$.ajax({
			url: '/products/search',
			method: 'post',
			datatype : 'json',
			data : {'userName':searchText},
			success:function(response){
				if(response.user !== 'error' && response.user !== undefined){
                    $('#myTable tbody').empty();
                    //console.log(response.user[0]);
                    for(var i = 0; i < response.user.length; i++){
                        $('#myTable tbody:last-child').append('<tr><td>'+response.user[i].name+'</td><td>'+response.user[i].description+'</td><td>'+response.user[i].brand+'</td><td>'+response.user[i].price+'</td><td>'+response.user[i].category+'</td></tr>'); 
                    }
                    //$('#myTable tbody:last-child').append('<tr><td>'+response.user.name+'</td><td>'+response.user.description+'</td><td>'+response.user.brand+'</td><td>'+response.user.price+'</td><td>'+response.user.category+'</td></tr>');
				}else{

				}
			},
			error:function(response){
				alert('server error');
			}
		});
	});
});