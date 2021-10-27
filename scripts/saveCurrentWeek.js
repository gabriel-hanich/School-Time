var aBtn = document.getElementById("weekABtn");
var BBtn = document.getElementById("weekBBtn");

function isWeekA(){
    console.log("WEEKA")
    var today = new Date();
    localStorage.setItem("lastWeekADate", today);
    window.location.href = "../pages/getWeekNumber.html"
}

function isWeekB(){
    var today = new Date();
    // If its week B this week, a week ago it would be week A
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); // Find date one week ago
    localStorage.setItem("lastWeekADate", lastWeek);
    window.location.href = "../pages/getWeekNumber.html"
}

aBtn.addEventListener("click", isWeekA);
BBtn.addEventListener("click", isWeekB);