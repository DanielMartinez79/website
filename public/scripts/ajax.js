function sendAJAX(obj) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "db/exercise");
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("POST")
    xhttp.send(obj);
}

function queryAJAX(callback) {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            console.log(this.responseText)
            callback(this)
        }
    }
    xhttp.open("GET", "db/exercise");
    xhttp.send();
}

function dropAJAX(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "db/table");
    xhttp.send();
}

function updateAJAX(obj){
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "db/exercise")
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("PUT")
    xhttp.send(obj)
}

