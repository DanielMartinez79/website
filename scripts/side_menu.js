$(document).ready(function(){
    $.get("side_menu.html", function(data, status){
        $("#side_bar").append(data);
        console.log(data);
        console.log(status);

    });
});