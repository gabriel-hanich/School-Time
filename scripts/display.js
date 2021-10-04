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
            var newCell = newRow.insertCell(-1);

            var className = dayData[k].className.substring(dayData[k].className.indexOf(":") + 2)
            newCell.innerHTML = `
                        <tr>
                        <div class="periodBox">
                            <h2 class="periodNum classData">Period ` + dayData[k].period + `</h2>
                            <h2 class="className classData">` + className + `</h2>
                            <h2 class="location classData">` + dayData[k].location + `</h2>
                            <h2 class="teacher classData">` + dayData[k].teacher + `</h2>
                        </div>
                    </tr>
                    `
        } 
    }
}

