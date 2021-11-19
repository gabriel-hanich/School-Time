var dayOptionButtons = document.getElementsByClassName("dayOptionButton");
var dayOptionContainers = document.getElementsByClassName("daySubOptionContainer");

function cleanUpClassName(name){
    if(typeof name != undefined){
        name = name.substring(name.indexOf(":") + 1)
        if(name.indexOf("Yr") != -1){
            name = name.substring(0, name.indexOf("Yr"))
        }
        return name
    }else{
        return undefined
    }
}



function reOrderDayList(event){
    for(var i=0; i<dayOptionButtons.length; i++){
        dayOptionContainers[i].style = `
        order: ` + i.toString() + `;
        `
    }
    
    var thisContainter = event.path[1];
    thisContainter.style = `
        order: -1;
    `
    currentDay = event.target.id
    generateAvailableClasses()
}


for(var i=0; i<dayOptionButtons.length; i++){
    dayOptionContainers[i].style = `
    order: ` + i.toString() + `;
    `
    dayOptionButtons[i].addEventListener("click", reOrderDayList)
}


var weekOptionButtons = document.getElementsByClassName("weekOptionButton");
var weekOptionContainers = document.getElementsByClassName("weekSubOptionContainer");

function reOrderWeekList(event){
    for(var i=0; i<weekOptionContainers.length; i++){
        weekOptionContainers[i].style = `
        order: ` + i.toString() + `;
        `
    }
    
    var thisContainter = event.path[1];
    thisContainter.style = `
    order: -1;
    `

    currentWeek = event.target.id;
    generateAvailableClasses()
}


for(var i=0; i<weekOptionContainers.length; i++){
    weekOptionContainers[i].style = `
        order: ` + i.toString() + `;
    `
    weekOptionButtons[i].addEventListener("click", reOrderWeekList)
}

var currentDay = "anyDayBtn"
var currentWeek = "anyWeekBtn"

var weekAData = JSON.parse(localStorage.getItem("weekAData"))
var weekBData = JSON.parse(localStorage.getItem("weekBData"))

var classOptionContainer = document.getElementsByClassName("optionContainer")[2]
console.log(classOptionContainer)
generateAvailableClasses()

function generateAvailableClasses(){
    var child = classOptionContainer.lastElementChild; 
    while (child) {
        classOptionContainer.removeChild(child);
        child = classOptionContainer.lastElementChild;
    }



    var dayBtnIndexes = {"anyDayBtn": "any", "mondayBtn": 1, "tuesdayBtn": 2, "wednesdayBtn":3, "thursdayBtn":4, "fridayBtn":5}
    var weekData = [];
    if(currentWeek == "anyWeekBtn"){
        weekData = weekAData;
        weekData = weekData.concat(weekBData)
    }else if(currentWeek == "aWeekBtn"){
        weekData = weekAData;
    }else if(currentWeek == "bWeekBtn"){
        weekData = weekBData;
    }
    var periodNames = []
    for(var i=0; i<weekData.length; i++){
        found = false
        for(var k=0; k<periodNames.length; k++){
            if(cleanUpClassName(weekData[i].className) == cleanUpClassName(periodNames[k])){
                found = true
            }
        }
        if(!found){
            periodNames.push(cleanUpClassName(weekData[i].className))
        }
    }
    for(var i=0; i<periodNames.length; i++){
        var thisSubOptionContainer = document.createElement("div");
        thisSubOptionContainer.classList.add("classSubOptionContainer")

        if(periodNames[i].length > 17){
            periodNames[i] = periodNames[i].substring(0, 13) + "..."
        }

        thisSubOptionContainer.innerHTML = `
            <button class="classBtn optionButton" id="`+ periodNames[i] +`btn">` + periodNames[i] + `</button>
        `
 
        classOptionContainer.appendChild(thisSubOptionContainer)
    }
    assignClassButtonListener()
}




function reOrderClassList(event){
    var classOptionButtons = document.getElementsByClassName("classBtn");
    var classOptionContainers = document.getElementsByClassName("classSubOptionContainer");
    console.log(classOptionButtons)
    console.log(classOptionContainers)
    console.log(event.path[1])

    for(var i=0; i<classOptionContainers.length; i++){
        classOptionContainers[i].style = `
        order: ` + (i + 1).toString() + `;
        `
    }
    var thisContainter = event.path[1];
    thisContainter.style = `
        order: -1;
    `

}

function assignClassButtonListener(){
    var classOptionButtons = document.getElementsByClassName("classBtn");
    var classOptionContainers = document.getElementsByClassName("classSubOptionContainer");
    for(var i=0; i<classOptionContainers.length; i++){
        classOptionContainers[i].style = `
            order: ` + i.toString() + `;
        `
        classOptionButtons[i].addEventListener("click", reOrderClassList)
    }
}
