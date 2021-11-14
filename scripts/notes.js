var daySelector = document.getElementById("daySelector");
var weekSelector = document.getElementById("weekSelector");
var classSelector = document.getElementById("classSelector");

var selectedDay = "any";
var selectedWeek = "any";

function cleanUpPeriodName(name){ 
    name = name.substring(name.indexOf(":") + 1)
    if(name.indexOf("Yr") !== -1){
        name = name.substring(0, name.indexOf("Yr"));
    }
    console.log(name)
    return name
}


function updateClassList(){
    var possibleClasses = [];
    var weekData = [];
    if(selectedWeek != "any"){
        weekData = JSON.parse(localStorage.getItem("week" + selectedWeek.toUpperCase() + "Data"))
    }else{
        weekData = JSON.parse(localStorage.getItem("weekAData")) ;
        weekData = weekData.concat(JSON.parse(localStorage.getItem("weekBData")))
        
    }
    if(selectedDay != "any"){
        for(var i=0; i<weekData.length; i++){
           if(new Date(weekData[i].datePair[0]).getDay() == selectedDay){
               possibleClasses.push(weekData[i])
           }
        }      
    }else{
        for(var i=0; i<weekData.length; i++){
            possibleClasses.push(weekData[i])
        }
    }
    var newPossibleClasses = [];
    for(var i=0; i<possibleClasses.length; i++){
        var found = false;
        for(var k=0; k<newPossibleClasses.length; k++){
            if(cleanUpPeriodName(possibleClasses[i].className) == cleanUpPeriodName(newPossibleClasses[k].className)){
                found = true;
            }
        }
        if(!found){
            newPossibleClasses.push(possibleClasses[i])
        }
    }
    var i, L = classSelector.options.length - 1;
    for(i = L; i >= 0; i--) {
        classSelector.remove(i);
    }
    console.log
    for(var i=0; i<newPossibleClasses.length; i++){
        thisOption = document.createElement("option")
        thisOption.innerHTML = `
        <option value="a" class="optionSelect">` + cleanUpPeriodName(newPossibleClasses[i].className) + `</option>
        `
        classSelector.appendChild(thisOption)
    }
}

updateClassList();

daySelector.addEventListener("click", function(event){
    selectedDay = event.target.value;
    updateClassList()
})

weekSelector.addEventListener("click", function(event){
    selectedWeek = event.target.value
    updateClassList()
})