// Button functionality
var wipeBtn = document.getElementById("wipeBtn");
var resetBtn = document.getElementById("resetBtn");
var backgroundBtn = document.getElementById("bakgroundImgBtn");
var noteBtn = document.getElementById("noteBtn");

wipeBtn.addEventListener("click", function(event){
    localStorage.clear();
    window.location.href = "../pages/welcome.html"
});
resetBtn.addEventListener("click", function(event){
    window.location.href = "../pages/validateCurrentWeek.html"
})

backgroundBtn.addEventListener("click", function(event){
    window.location.href = "../pages/uploadBackground.html"
})

noteBtn.addEventListener("click", function(event){
    window.location.href = "../pages/notesSplit.html"
});
