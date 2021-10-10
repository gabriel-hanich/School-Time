var weekAData = localStorage["weekAData"];
var debug = false;
if(weekAData == undefined){
    if(debug){
        window.location.href = "../pages/display.html"
    }else{
        window.location.href = "../pages/uploadFile.html"
    }
}
else{
    window.location.href = "../pages/display.html"
}