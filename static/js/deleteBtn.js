$(document).ready(function(){
    $('#deleteBtn').click(function(e) {
        e.preventDefault();
        var myUrl = $(this).attr('href');
        $.ajax({
            method:'DELETE',
            url:myUrl,
            success:function(data){
                console.log(data);
                window.location.href= '/garden';
            }
        })
    })
})
