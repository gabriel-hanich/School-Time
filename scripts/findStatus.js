// If the data for week A cannot be found redirect the user to the setup pages
var weekAData = localStorage.getItem("weekAData");
var debug = false;

if(debug){
    window.location.href = "../pages/editNotes.html"
}
else{
    if(weekAData == undefined){
        window.location.href = "../pages/welcome.html"
    }
    else{
        window.location.href = "../pages/display.html"
    }
}