var periodDataRaw = JSON.parse(localStorage.getItem("classData"));
var errorBox = document.getElementById("errorBox");
var process_btn = document.getElementById("process_btn");
var daysList = ["monday", "tuesday", "wednesday", "thursday", "friday"]
var weeksList = ["a", "b"]

 


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



function generateTimeTableData(event){
    periodDataRaw = JSON.parse(localStorage.getItem("classData"));

    if(periodDataRaw == null){ 
        errorBox.classList.add("show");
    }else{
        errorBox.classList.remove("show")
        console.log("show")
    }

    var periodData = [];
    for(var i = 0; i<periodDataRaw.length; i++){
        var thisPeriod = periodDataRaw[i]
        var startDate = new Date(thisPeriod.startDate);
        var endDate = new Date(thisPeriod.endDate);
        var period = parseInt(thisPeriod.period);
        if(Number.isNaN(period)){
            period = 2;
        }
        console.log(period)
        periodData.push(new periodClass(startDate, endDate, thisPeriod.teacher, period, thisPeriod.className, thisPeriod.location));

    }
    periodData.sort(function(a, b){
        return a.startDate - b.startDate;
    });

    // Find 2, unique, full weeks
    var aStartIndex = 0;
    var bStartIndex = 0;
    var bEndIndex = 0;
    for(var i = 0; i < periodData.length; i++){
        if(periodData[i].startDate.getDay() == 1){ //If the class is on a monday
            aStartIndex = i;
            break;
        }
    }

    for(var i = 0; i < periodData.length; i++){
        if(periodData[i].startDate.getDay() == 1){ //If the class is on a monday
            if(periodData[i].startDate.getDate() != periodData[aStartIndex].startDate.getDate()){ //Ensure the start of week B isn't the same date as the start of week A
                bStartIndex = i;
                break;
            }
        }
    }

    //Find end of week b
    for(var i = bStartIndex; i < periodData.length; i++){
        if(periodData[i].startDate.getDay() == 5){ //If the class is on a Friday
            if(periodData[i + 1].startDate.getDay() == 1){ // If the NEXT class is on Monday
                bEndIndex = i;
                break;
            } 
        }
    }

    var weekAList = {};
    var weekBList = {};

    for(var i = aStartIndex; i < bStartIndex; i++){
        if(weekAList[periodData[i].startDate.getDay()] == null){
            weekAList[periodData[i].startDate.getDay()] = [periodData[i]];
        }
        else{
            weekAList[periodData[i].startDate.getDay()].push(periodData[i]);
        }
    }

    for(var i = bStartIndex; i < bEndIndex; i++){
        if(weekBList[periodData[i].startDate.getDay()] == null){
            weekBList[periodData[i].startDate.getDay()] = [periodData[i]];
        }
        else{
            weekBList[periodData[i].startDate.getDay()].push(periodData[i]);
        }
    }

    for(var dayCount = 1; dayCount <= 5; dayCount++){
        weekAList[dayCount].sort((a, b) => (a.period > b.period) ? 1 : -1);
        weekBList[dayCount].sort((a, b) => (a.period > b.period) ? 1 : -1);
        console.log(weekAList[dayCount]);
    }

    localStorage.setItem("weekAList", JSON.stringify(weekAList));
    localStorage.setItem("weekBList", JSON.stringify(weekBList));

    window.location.href = "../pages/display.html"

}

process_btn.addEventListener("click", generateTimeTableData)