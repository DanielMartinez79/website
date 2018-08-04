var path = location.pathname;
var name = path.split("/").pop();
var identity = name.split(".");
console.log(identity[0]);
$(document).ready(function () {
    $("#navdiv").load("nav_bar.html", function () {
        $("#" + identity).addClass("current");
    });
}); 