var weekARaw = JSON.parse(localStorage.getItem("weekAList"))
var weekBRaw = JSON.parse(localStorage.getItem("weekBList"))

var thisWeek = "a";

class periodClass{
    constructor(startDate, endDate, teacher, period, className, location){
        this.startDate = startDate;
        this.endDate = endDate;
        this.teacher = teacher;
        this.period = period;
        this.className= className;
        this.className = className;
        this.location = location

    }
}

var weekA = {};
var weekB = {};
for(var i = 1; i <= 5; i++){
    var thisDay = weekARaw[i];
    var todayList = [];
    for(k = 0; k<thisDay.length; k++){
        startDate = new Date(thisDay[k].startDate);
        endDate = new Date(thisDay[k].endDate);
        todayList.push(new periodClass(startDate, endDate, thisDay[k].teacher, thisDay[k].period, thisDay[k].className, thisDay[k].location))
    }
    weekA[i] = todayList
}

for(var i = 1; i <= 5; i++){
    var thisDay = weekBRaw[i];
    var todayList = [];
    for(k = 0; k<thisDay.length; k++){
        startDate = new Date(thisDay[k].startDate);
        endDate = new Date(thisDay[k].endDate);
        todayList.push(new periodClass(startDate, endDate, thisDay[k].teacher, thisDay[k].period, thisDay[k].className, thisDay[k].location))
    }
    weekB[i] = todayList;
}


var todayTomorrowTables = [document.getElementById("todayTable"), document.getElementById("tomorrowTable")]
if(thisWeek = "a"){
    var today = new Date().getDay();
    console.log(today)

    for(var i= today; i<today + 2; i++){
        var dayData = weekA[i];
        for(var k=0; k<dayData.length; k++){
            var newRow = todayTomorrowTables[i - today].insertRow(-1);
            var periodCell = newRow.insertCell(0);
            var dataCell = newRow.insertCell(1);

            periodCell.innerHTML = `
                                <tr>
                                    <div class="numberBox">
                                        <h2>` + dayData[k].period + `</h2>
                                    </div>
                                </tr>`
                                        
            
            
            var className = dayData[k].className.substring(dayData[k].className.indexOf(":") + 2)
            className = className.slice(0, className.indexOf("Yr") - 1) 

            var startDate = dayData[k].startDate.toString();
            startDate = startDate.substring(startDate.indexOf(":") - 2)
            var startHour = parseInt(startDate.substring(0, 2));
            var startMinute = parseInt(startDate.substring(3));
            var startTimeType = "am";
            if(startHour > 12){
                startHour -= 12;
                startTimeType = "pm";
            }
            
            var endTime = dayData[k].endDate.toString();
            endTime = endTime.substring(endTime.indexOf(":") - 2)
            var endHour = parseInt(endTime.substring(0, 2));
            var endMinute = endTime.slice(3, 5);
            var endTimeType = "am";
            if(endHour > 12){
                endHour -= 12;
                endTimeType = "pm";
            }

            var startTime = startHour.toString() + ":" + startMinute.toString() + startTimeType
            var endTime = endHour.toString() + ":" + endMinute.toString() + endTimeType

            dataCell.innerHTML = `
                        <tr>
                        <div class="periodBox">
                            <h2 class="className classData">` + endTime +  `</h2>
                            <h2 class="location classData">` + dayData[k].location + `</h2>
                            <h2 class="teacher classData">` + dayData[k].teacher + `</h2>
                        </div>
                    </tr>
                    `
        } 
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


function spin(event){
    var periodBoxes = document.getElementsByClassName("periodBox");
    if(spun){
        for(var i =0; i< periodBoxes.length; i++){
            periodBoxes[i].style = "transform: rotate3d(1, 0, 0, 0deg)";
        }
    }
    else{
        for(var i =0; i< periodBoxes.length; i++){
            periodBoxes[i].style = "transform: rotate3d(1, 0, 0, 180deg)";
        }
        console.log(i)
    }

    spun = !spun
}

var spun = false;
var spinButton = document.getElementById("spinBtn");

spinButton.addEventListener("click", spin)
