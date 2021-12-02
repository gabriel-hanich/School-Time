// Aligns weeks in Time Table to actual A or B values
var weekAData = JSON.parse(localStorage.getItem("possibleAData"));
var weekBData = JSON.parse(localStorage.getItem("possibleBData"));

class periodClass{
    constructor(datePair, teacher, period, className, location){
        this.datePair = datePair;
        this.teacher = teacher;
        this.period = period;
        this.className= className;
        this.className = className;
        this.location = location
        
    }
}

function cleanUpClassName(name){ // Removes unnecessary characters from class names
    if(typeof name != undefined){
        name = name.substring(name.indexOf(":") + 2);
        if(name.indexOf("Yr") != -1){
            name = name.substring(0, name.indexOf("Yr") - 1);
        }
        return name
    }else{
        return undefined
    }
}



function generatePeriodInfoBox(classObj, doHighlight, minutesOfClassLeft, notesList, dateStringPair){ 
    // Code that establishes the periodNumberBox and opens the main div
    var htmlString = `
    <tr>
        <div class="dataRow">
            <div class="numberBox tableBox">
                <h2>` + classObj.period[0] + `</h2>
            </div>

            <div class="periodInfoBox notePeriodInfoBox dataBox tableBox`
            
    if(doHighlight){ // Add highlight to box if necessary
        htmlString += " highlightClass"
    }
    htmlString += `">
            <div class="periodInfoContainer notePeriodInfoContainer">
                <div class="periodInfo"><h2 class="className classData">` + cleanUpClassName(classObj.className) +  `</h2></div>
                <div class="periodInfo"><h2 class="location classData">` + classObj.location + `</h2></div>
                <div class="periodInfo"><h2 class="teacher classData">` + classObj.teacher.toLowerCase() + `</h2></div>
            </div>
    `

    if(notesList.length != 0){ // Add any notes present
        htmlString += `
            <div class="noteContainer">`
        for(var notes=0; notes < notesList.length; notes++){
            htmlString += `
                <div class="note">
                    <h2 class="noteText">` + notesList[notes].noteContent + `</h2>
                </div>`
        }
        htmlString += `
            </div>
        `
    }
    // Code for timeBoxes 
    htmlString += `
        </div>
        <div class="timeBox periodBox tableBox dataBox`
    if(doHighlight){
        htmlString += ` highlightClass`
    }
    htmlString += ` highlightCell hidden">
            <h2 class="startTime classData timeData">Start: ` + dateStringPair[0] +  `</h2>
            <h2 class="endTime classData timeData">End: ` + dateStringPair[1] + `</h2>`

    if(doHighlight){ // Add highlight classes to timebox if necessary
        htmlString += `
            <h2 class="classData timeData highlightTime">Time left:` + minutesOfClassLeft + ` min</h2>`
    }
    // Close off final divs
    htmlString += `
            </div>
        </tr>
    `
    console.log(htmlString)
    return htmlString
}

var weekA = [];
for(var i=0; i<weekAData.length; i++){
    var datePair = [];
    var thisClass = weekAData[i]
    for(var k=0; k<2; k++){
        datePair.push(new Date(thisClass.datePair[k]));
    }
    weekA.push(new periodClass(datePair, thisClass.teacher, thisClass.period, thisClass.className, thisClass.location));
}
var weekB = [];
for(var i=0; i<weekBData.length; i++){
    var datePair = [];
    var thisClass = weekBData[i]
    for(var k=0; k<2; k++){
        datePair.push(new Date(thisClass.datePair[k]));
    }
    weekB.push(new periodClass(datePair, thisClass.teacher, thisClass.period, thisClass.className, thisClass.location));
}

var table = document.getElementById("mondayTable")
// Display Mondays Data 
for(var i=0; i<weekA.length; i++){
    if(weekA[i].datePair[0].getDay() == 1){
        var newRow = table.insertRow(-1);
        var dataCell = newRow.insertCell(0);

        dataCell.innerHTML = generatePeriodInfoBox(weekA[i], false, 0, [], [])

    }
}



weekABtn = document.getElementById("weekABtn");
weekBBtn = document.getElementById("weekBBtn");

weekABtn.addEventListener("click", weekBtnPress);
weekBBtn.addEventListener("click", weekBtnPress);

console.log(weekA)  
function weekBtnPress(event){
    console.log(event.path[0].id);
    localStorage.removeItem("possibleAData")
    localStorage.removeItem("possibleBData")
    if(event.path[0].id == "weekABtn"){
        localStorage.setItem("weekAData", JSON.stringify(weekA));
        localStorage.setItem("weekBData", JSON.stringify(weekB));
    }
    else if(event.path[0].id == "weekBBtn"){
        localStorage.setItem("weekAData", JSON.stringify(weekB));
        localStorage.setItem("weekBData", JSON.stringify(weekA));
    }
    window.location.href = "../pages/validateCurrentWeek.html";
}
