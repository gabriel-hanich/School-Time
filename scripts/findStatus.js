// If the data for week A cannot be found redirect the user to the setup pages
var weekAData = localStorage.getItem("weekAData");
var noteData = localStorage.getItem("notesList");
var debug = false;

if(localStorage.getItem("notesList") == undefined){
    localStorage.setItem("notesList", JSON.stringify([]))
}

if(debug){
    window.location.href = "../pages/notesSplit.html"
}
else{
    if(weekAData == undefined){
        window.location.href = "../pages/welcome.html"
    }
    else{
        window.location.href = "../pages/display.html"
    }
}