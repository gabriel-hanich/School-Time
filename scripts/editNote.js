var noteData = JSON.parse(localStorage.getItem("notesList"));
if (noteData == null || noteData == undefined){
    noteData = []
}
var noteTable = document.getElementById("noteTable");
if(noteData.length != 0){
    dayDict = {"any":"Any",1: "Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 6:"Friday"};
    
    for(var i=0; i<noteData.length; i++){
        var thisTableRow = document.createElement("div");
        thisTableRow.classList.add("noteTableRow");
    
        var week = noteData[i].weekType.toString()
    
        thisTableRow.innerHTML = `
        <div class="noteSubject noteData">
            <h2>` + noteData[i].className + `</h2>
        </div>
        <div class="noteWeek noteData">
            <h2>` + week.substring(0, week.indexOf("Week")) + `</h2>
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
}
else{
    console.log("EMPTY")
    displayEmptyMsg();
}


setDeteleteBtnListeners();

function setDeteleteBtnListeners(){
    var deleteBtns = document.getElementsByClassName("deleteIco");
    for(var i=0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener("click", deleteNote)
    }
}

function deleteNote(event){
    noteData.splice(event.target.id[0], 1);
    localStorage.setItem("notesList", JSON.stringify(noteData));

    var divToDelete = event.path[2];
    noteTable.removeChild(divToDelete);
    setDeteleteBtnListeners();

    if(noteData.length == 0){
        displayEmptyMsg();
    }
}

function displayEmptyMsg(){
    var emptyMessage = document.createElement("div");
    emptyMessage.classList.add("emptyMsg");
    emptyMessage.innerHTML = `
        <h2>You have no notes currently, Add One Below</h2>
        <a href="../pages/addNote.html">
            <button class="addBtn">Here</button>
        </a>

    `
    noteTable.appendChild(emptyMessage);
}