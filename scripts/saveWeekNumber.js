var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(event){
    var weekNumberEntry = document.getElementById("weekNumField")
    var weekNumberText = parseInt(weekNumberEntry.value);

    var weekArray = [weekNumberText, new Date()];
    localStorage.setItem("weekNumber", weekArray);
    localStorage.setItem("notesList", JSON.stringify([]));
    window.location.href = "../pages/display.html";
});