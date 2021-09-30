var periodDataRaw = JSON.parse(localStorage.getItem("classData"));
var errorBox = document.getElementById("errorBox");
var process_btn = document.getElementById("process_btn");
var daysList = ["monday", "tuesday", "wednesday", "thursday", "friday"]
var weeksList = ["a", "b"]

 


class periodClass{
    constructor(startDate, endDate, desc, summary, location){
        this.startDate = startDate;
        this.endDate = endDate;
        this.desc = desc;
        this.summary = summary;
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
        thisPeriod = periodDataRaw[i]
        startDate = new Date(thisPeriod.startDate);
        endDate = new Date(thisPeriod.endDate);
        periodData.push(new periodClass(startDate, endDate, thisPeriod.desc, thisPeriod.summary, thisPeriod.location));

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
                console.log("YES")
                bEndIndex = i;
                break;
            } 
        }
    }

    console.log(periodData[aStartIndex].startDate);
    console.log(periodData[bStartIndex].startDate);
    console.log(periodData[bEndIndex].startDate);



    // for(var weekCount = 0; weekCount < weeksList.length; weekCount++){
    //     for(var dayCount = 0; dayCount < daysList.length; dayCount++){

    //     }
    // }
}

process_btn.addEventListener("click", generateTimeTableData)