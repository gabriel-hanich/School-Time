var noteData = JSON.parse(localStorage.getItem("notesList"));

if (noteData == null || noteData == undefined){
    noteData = []
}

dayDict = {1: "Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 6:"Friday"};

var noteTable = document.getElementById("noteTable");
for(var i=0; i<noteData.length; i++){
    var thisTableRow = document.createElement("div");
    thisTableRow.classList.add("noteTableRow");
    thisTableRow.innerHTML = `
    <div class="noteSubject noteData">
        <h2>` + noteData[i].className + `</h2>
    </div>
    <div class="noteWeek noteData">
        <h2>` + noteData[i].weekType[0].toUpperCase() + `</h2>
    </div>
    <div class="noteDay noteData">
        <h2>` + dayDict[noteData[i].day] + `</h2>
    </div>
    <div class="noteContent noteData">
        <h2>` + noteData[i].noteContent + `</h2>
    </div>
    <div class="noteDelete noteData">
        <img src="../resources/icons/delete.svg" alt="Delete" class="deleteIco" id="` + i.toString() + `rowDeleteIco">
    </div>
    `
    noteTable.appendChild(thisTableRow);
}