var weekAData = JSON.parse(localStorage.getItem("possibleAData"));


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
var weekA = [];
for(var i=0; i<weekAData.length; i++){
    var datePair = [];
    var thisClass = weekAData[i]
    for(var k=0; k<2; k++){
        datePair.push(new Date(thisClass.datePair[k]));
    }
    weekA.push(new periodClass(datePair, thisClass.teacher, thisClass.period, thisClass.className, thisClass.location));
}
console.log(weekA);

var table = document.getElementById("mondayTable")

for(var i=0; i<weekA.length; i++){
    if(weekA[i].datePair[0].getDay() == 1){
        var newRow = table.insertRow(-1);
        var periodCell = newRow.insertCell(0);
        var dataCell = newRow.insertCell(1);
        periodCell.innerHTML = `<tr>
                                    <div class="numberBox">
                                        <h2>` + weekA[i].period + `</h2>
                                    </div>
                                </tr>`

        dataCell.innerHTML = `<tr>
                                <div class="periodBox">
                                    <h2 class="className classData">` + weekA[i].className +  `</h2>
                                    <h2 class="location classData">` + weekA[i].location + `</h2>
                                    <h2 class="teacher classData">` + weekA[i].teacher + `</h2>
                                </div>
                            </tr>
                            `
    }
}