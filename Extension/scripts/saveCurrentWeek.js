var aBtn = document.getElementById("weekABtn");
var BBtn = document.getElementById("weekBBtn");

function isWeekA(){
    console.log("WEEKA")
    var today = new Date();
    localStorage.setItem("lastWeekADate", today);
    window.location.href = "../pages/display.html"
}

function isWeekB(){
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    localStorage.setItem("lastWeekADate", lastWeek);
    window.location.href = "../pages/display.html"
}

aBtn.addEventListener("click", isWeekA);
BBtn.addEventListener("click", isWeekB);