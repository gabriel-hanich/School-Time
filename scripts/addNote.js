// Return subject name (i.e English) from class title 
function cleanUpClassName(name){
    if(typeof name != undefined){
        name = name.substring(name.indexOf(":") + 1);
        if(name.indexOf("Yr") != -1){
            name = name.substring(0, name.indexOf("Yr"));
        }
        return name
    }else{
        return undefined
    }
}
function cleanBtnId(idName){
    idName = idName.substring(0, idName.indexOf("Btn"))
    return idName
}

// Declare reshuffling for both day and week selectors (bring selected elem to top of the list)
var dayOptionButtons = document.getElementsByClassName("dayOptionButton");
var dayOptionContainers = document.getElementsByClassName("daySubOptionContainer");

function reOrderDayList(event){
    for(var i=0; i<dayOptionButtons.length; i++){ // Reset all days to their original position
        dayOptionContainers[i].style = `
        order: ` + i.toString() + `;
        `;
    }
    
    var thisContainter = event.path[1]; // Bring selected container to the top
    thisContainter.style = `
        order: -1;
    `;
    currentDay = event.target.id;
    generateAvailableClasses(); // As new elem has been selected, nwe available classes need to be generated
}


for(var i=0; i<dayOptionButtons.length; i++){ // Reset and declare containers and click listeners
    dayOptionContainers[i].style = `
    order: ` + i.toString() + `;
    `;
    dayOptionButtons[i].addEventListener("click", reOrderDayList);
}

// Declare shuffiling for week buttons
var weekOptionButtons = document.getElementsByClassName("weekOptionButton");
var weekOptionContainers = document.getElementsByClassName("weekSubOptionContainer");

function reOrderWeekList(event){
    for(var i=0; i<weekOptionContainers.length; i++){ // Reset Order
        weekOptionContainers[i].style = `
        order: ` + i.toString() + `;
        `;
    }
    
    var thisContainter = event.path[1]; // Send to top
    thisContainter.style = `
    order: -1;
    `;

    currentWeek = event.target.id;
    generateAvailableClasses(); // Generate new available classes
}


for(var i=0; i<weekOptionContainers.length; i++){ // Declare and reorder Week cards
    weekOptionContainers[i].style = `
        order: ` + i.toString() + `;
    `;
    weekOptionButtons[i].addEventListener("click", reOrderWeekList);
}

var currentDay = "anyDayBtn";
var currentWeek = "anyWeekBtn";

var weekAData = JSON.parse(localStorage.getItem("weekAData"));
var weekBData = JSON.parse(localStorage.getItem("weekBData"));

var classOptionContainer = document.getElementsByClassName("optionContainer")[2];
generateAvailableClasses();

var dayBtnIndexes = {"anyDayBtn": "any", "mondayBtn": 1, "tuesdayBtn": 2, "wednesdayBtn":3, "thursdayBtn":4, "fridayBtn":5};

function generateAvailableClasses(){ // Generates what classes fit within a given day and weekType (A, B, Any) parameters and displays them
    var child = classOptionContainer.lastElementChild; // Remove all buttons from the classSelector Container (Reset it)
    while (child) {
        classOptionContainer.removeChild(child);
        child = classOptionContainer.lastElementChild;
    }
    // Find data associated with selected Week
    var weekData = [];
    if(currentWeek == "anyWeekBtn"){
        weekData = weekAData;
        weekData = weekData.concat(weekBData)
    }else if(currentWeek == "aWeekBtn"){
        weekData = weekAData;
    }else if(currentWeek == "bWeekBtn"){
        weekData = weekBData;
    }

    var dayBtnIndexes = {"anyDayBtn": "any", "mondayBtn": 1, "tuesdayBtn": 2, "wednesdayBtn":3, "thursdayBtn":4, "fridayBtn":5};
    var periodNames = [];
    for(var i=0; i<weekData.length; i++){
        found = false;
        // Check if class falls on specified day OR day selected is 'any'
        if(new Date(weekData[i].datePair[0]).getDay() == dayBtnIndexes[currentDay] || dayBtnIndexes[currentDay] == "any"){
            for(var k=0; k<periodNames.length; k++){
                if(cleanUpClassName(weekData[i].className) == cleanUpClassName(periodNames[k])){
                    found = true; // Ensure the same class isn't added to the list twice
                }
            }
            if(!found){
                periodNames.push(cleanUpClassName(weekData[i].className));
            }
        }
    }
    // Add selected classes to the screen
    for(var i=0; i<periodNames.length; i++){
        var thisSubOptionContainer = document.createElement("div");
        thisSubOptionContainer.classList.add("classSubOptionContainer");

        if(periodNames[i].length > 17){ // Shorten class names 
            periodNames[i] = periodNames[i].substring(0, 13) + "...";
        }

        thisSubOptionContainer.innerHTML = `
            <button class="classBtn optionButton" id="`+ periodNames[i].substring(1) +`Btn">` + periodNames[i] + `</button>
        `;
        classOptionContainer.appendChild(thisSubOptionContainer);
        if(i == 0){
            currentClass = thisSubOptionContainer.children[0].id
        }
    }
    assignClassButtonListener(); // Re assign new buttons with an event listener
}




function reOrderClassList(event){
    var classOptionContainers = document.getElementsByClassName("classSubOptionContainer");
    
    for(var i=0; i<classOptionContainers.length; i++){ // Reset Order
        classOptionContainers[i].style = `
        order: ` + (i + 1).toString() + `;
        `;
    }
    var thisContainter = event.path[1]; // Bring selected one to top of the list
    thisContainter.style = `
    order: -1;
    `;
    currentClass = event.target.id
    
}

function assignClassButtonListener(){
    var classOptionButtons = document.getElementsByClassName("classBtn");
    var classOptionContainers = document.getElementsByClassName("classSubOptionContainer");
    for(var i=0; i<classOptionContainers.length; i++){ // Reset Order
        classOptionContainers[i].style = `
            order: ` + i.toString() + `;
        `;
        classOptionButtons[i].addEventListener("click", reOrderClassList);
    }
}

// Read and save data
var submitBtn = document.getElementById("submitNoteBtn");
submitBtn.addEventListener("click", saveData);

class note{
    constructor(weekType, day, className, noteContent){
        this.weekType = weekType;
        this.day = day;
        this.className= className;
        this.noteContent = noteContent;
    }
}


function saveData(event){
    var existingNotes = JSON.parse(localStorage.getItem("notesList"));
    if(existingNotes == null){
        existingNotes = [];
    }
    var noteContentInput = document.getElementById("contentInput");
    existingNotes.push(new note(cleanBtnId(currentWeek), dayBtnIndexes[currentDay], cleanBtnId(currentClass), noteContentInput.value));
    noteContentInput.value="";
    localStorage.removeItem("notesList");
    localStorage.setItem( "notesList", JSON.stringify(existingNotes));
    window.location.href = "../pages/notesSplit.html";
    
}

