// If the data for week A cannot be found redirect the user to the setup pages
var weekAData = localStorage.getItem("weekAData");
var noteData = localStorage.getItem("notesList");
var debug = false;

if(noteData == undefined){
    localStorage.setItem("notesList", []) // Fix error with crash when user upgrades to new version
}

if(debug){
<<<<<<< Updated upstream
    window.location.href = "../pages/getWeekNumber.html"
=======
    window.location.href = "../pages/howTo.html"
>>>>>>> Stashed changes
}
else{
    if(weekAData == undefined){
        window.location.href = "../pages/welcome.html"
    }
    else{
        window.location.href = "../pages/display.html"
    }
}