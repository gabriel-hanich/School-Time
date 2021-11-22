var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(event){
    var weekNumberEntry = document.getElementById("weekNumField")
    var weekNumberText = parseInt(weekNumberEntry.value);

    var weekArray = [weekNumberText, new Date()];
    var noteList = JSON.stringify([])
    localStorage.setItem("weekNumber", weekArray);
    localStorage.setItem("notesList", noteList)
    window.location.href = "../pages/display.html";
});