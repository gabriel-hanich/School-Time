var weekAData = localStorage.getItem("weekAData");
var debug = false;

if(debug){
    window.location.href = "../pages/uploadBackground.html"
}
else{
    if(weekAData == undefined){
        window.location.href = "../pages/uploadFile.html"
    }
    else{
        window.location.href = "../pages/display.html"
    }
}