// Calculate what week it is today

var lastWeekA = new Date(localStorage.getItem("lastWeekADate")); // Gather the last date when it was Week A
var today = new Date();

// Function that gets the date a specified numeber of days after a given day
Date.prototype.addDays = function(days) { 
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// Returns an array with all the dates between to dates
function getDatesBetween(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
// Calculate number of sundays between the two days
var datesBetween =  getDatesBetween(lastWeekA.addDays(1), today);
weeksCount = 0;
for(var i=0; i<datesBetween.length; i++){
    if(datesBetween[i].getDay() == 0){
        weeksCount = weeksCount + 1;

    }
}
// If it has been an even number of weeks since the last weekA it must be week A
if(weeksCount == 0){
    isWeekA = true;
} else if(weeksCount % 2 == 0){
    isWeekA = true;
}else if(weeksCount % 2 == 1){
    isWeekA = false;
}


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


var weekADataRaw = JSON.parse(localStorage.getItem("weekAData"));
var weekBDataRaw = JSON.parse(localStorage.getItem("weekBData"));

// Process the strings from the stored data into Date() objects
var weekAData = []
for(var i=0; i<weekADataRaw.length; i++){
    thisClass = weekADataRaw[i];
    var datePair = [];
    for(var j=0; j<2; j++){
        datePair.push(new Date(thisClass.datePair[j]))
    }
    weekAData.push(new periodClass(datePair, thisClass.teacher, thisClass.period, thisClass.className, thisClass.location));
}

var weekBData = []
for(var i=0; i< weekBDataRaw.length; i++){
    thisClass = weekBDataRaw[i];
    var datePair = [];
    for(var j=0; j<2; j++){
        datePair.push(new Date(thisClass.datePair[j]))
    }
    weekBData.push(new periodClass(datePair, thisClass.teacher, thisClass.period, thisClass.className, thisClass.location));
}

var tables = [document.getElementById("todayTable"), document.getElementById("tomorrowTable")];
var heading = document.getElementById("displayHeading");

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Find if the user has a custom background image (if so applies frosted glass background to boxes)
var doGlass = false;
var bgImgUrl = localStorage.getItem("imgUrl");
var statusText = document.getElementById("statusText");
if(bgImgUrl != undefined){
    doGlass = true;
}

// Define which data set it used (week A or week B)

if(isWeekA){
    statusText.innerHTML = `
    <div class="quickDisplay" id="statusText">
        <h2>` + dayNames[today.getDay()] + ` Week A</h2>
    </div>
    `
    var displayWeekData = weekAData;
}

else if(!isWeekA){
    statusText.innerHTML = `
    <div class="quickDisplay" id="statusText">
        <h2>` + dayNames[today.getDay()] + ` Week B</h2>
    </div>
    `
    var displayWeekData = weekBData;
}
// Display the data
for(var i=0; i<2; i++){
    for(var k=0; k<displayWeekData.length; k++){
        if(displayWeekData[k].datePair[0].getDay() == today.getDay() + i){
            var newRow = tables[i].insertRow(-1);
            var periodCell = newRow.insertCell(0);
            var dataCell = newRow.insertCell(1);
            
            var className = displayWeekData[k].className.substring(displayWeekData[k].className.indexOf(":") + 1)
            
            var dataCellClassList = "periodBox tableBox"
            if(i == 0){ // Only calculate what class it is at the time for todays table
                console.log(className);
                var startDate = displayWeekData[k].datePair[0];
                var startTime = new Date(today.getTime());
                startTime.setHours(startDate.getHours());
                startTime.setMinutes(startDate.getMinutes())
    
                var endDate = displayWeekData[k].datePair[1];
                var endTime = new Date(today.getTime());
                endTime.setHours(endDate.getHours());
                endTime.setMinutes(endDate.getMinutes());
                
                var periodBoxClasses = "periodBox";
    
                if(startTime < today && endTime > today){
                    dataCellClassList += " highlightClass"
                }
            }
            
            periodCell.innerHTML = `
            <tr>
            <div class="numberBox tableBox">
                <h2>` + displayWeekData[k].period + `</h2>
            </div>
            </tr>`
            dataCell.innerHTML = `
            <tr>
            <div class="` + dataCellClassList + `">
                <h2 class="className classData">` + className +  `</h2>
                <h2 class="location classData">` + displayWeekData[k].location + `</h2>
                <h2 class="teacher classData">` + displayWeekData[k].teacher + `</h2>
            </div>
            </tr>`
        }
    }
  
    
}
// Apply frosted glass texture
if(doGlass){
    var toGlass = document.getElementsByClassName("tableBox");
    var body = document.body;
    for(var i=0; i<toGlass.length; i++){
        if(toGlass[i].classList.contains("highlightClass")){ // If the box is highlighted a colored frosted glass is used
            toGlass[i].classList.remove("highlightClass");
            toGlass[i].classList.add("highlightGlassClass");
        }else{
            toGlass[i].classList.add("glass")
        }
    }
    body.style = `
    background: url(` + bgImgUrl + `) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;`
}