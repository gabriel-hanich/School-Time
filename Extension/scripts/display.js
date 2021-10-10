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
        console.log("AA")
        weeksCount = weeksCount + 1;

    }
}

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

console.log(weekADataRaw)


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
    console.log("WEEKB")
    thisClass = weekBDataRaw[i];
    var datePair = [];
    for(var j=0; j<2; j++){
        datePair.push(new Date(thisClass.datePair[j]))
    }
    weekBData.push(new periodClass(datePair, thisClass.teacher, thisClass.period, thisClass.className, thisClass.location));
}

console.log(weekBData)

var tables = [document.getElementById("todayTable"), document.getElementById("tomorrowTable")];
var heading = document.getElementById("displayHeading");

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

if(isWeekA){
    console.log("A")
    heading.innerHTML = `
    <div class="headingContainer" id="displayHeading">
    <h1>Welcome, Today is ` + dayNames[today.getDay()] + ` of Week A</h1>
    </div>
    `
    
    for(var i=0; i<2; i++){
        for(var k=0; k<weekAData.length; k++){
            if(weekAData[k].datePair[0].getDay() == today.getDay() + i){
                var newRow = tables[i].insertRow(-1);
                var periodCell = newRow.insertCell(0);
                var dataCell = newRow.insertCell(1);
                
                var className = weekAData[k].className.substring(weekAData[k].className.indexOf(":") + 1)
                
                
                periodCell.innerHTML = `
                <tr>
                <div class="numberBox">
                <h2>` + weekAData[k].period + `</h2>
                </div>
                </tr>`
                
                dataCell.innerHTML = `
                <tr>
                <div class="periodBox">
                <h2 class="className classData">` + className +  `</h2>
                <h2 class="location classData">` + weekAData[k].location + `</h2>
                <h2 class="teacher classData">` + weekAData[k].teacher + `</h2>
                </div>
                </tr>`
            }
        }
    }
    
    
}
else if(!isWeekA){
    console.log("B")
    heading.innerHTML = `
    <div class="headingContainer" id="displayHeading">
    <h1>Welcome, Today is ` + dayNames[today.getDay()] + ` of Week B</h1>
    </div>
    `
    for(var i=0; i<2; i++){
        for(var k=0; k<weekBData.length; k++){
            if(weekBData[k].datePair[0].getDay() == today.getDay() + i){
                var newRow = tables[i].insertRow(-1);
                var periodCell = newRow.insertCell(0);
                var dataCell = newRow.insertCell(1);
                
                var className = weekBData[k].className.substring(weekAData[k].className.indexOf(":") + 1)
                
                
                periodCell.innerHTML = `
                <tr>
                    <div class="numberBox">
                        <h2>` + weekBData[k].period + `</h2>
                    </div>
                </tr>`

                dataCell.innerHTML = `
                <tr>
                    <div class="periodBox">
                        <h2 class="className classData">` + className +  `</h2>
                        <h2 class="location classData">` + weekBData[k].location + `</h2>
                        <h2 class="teacher classData">` + weekBData[k].teacher + `</h2>
                    </div>
                </tr>`
            }
        }
    }
}