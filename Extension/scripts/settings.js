var wipeBtn = document.getElementById("wipeBtn");
var weekBtn = document.getElementById("weekBtn")
var bgBtn = document.getElementById("bgBtn");


function getConfirmation()
    {
        var retVal = confirm("Are you sure you want to erase your timetable data?");
        if (retVal == true)
        {
            return true;
        } 
        else
        {
            return false;
        }
    }


function wipeData(){
    if(getConfirmation()){
        localStorage.removeItem("possibleAData");
        localStorage.removeItem("weekAData");
        localStorage.removeItem("weekBData");
        localStorage.removeItem("possibleBData");
        localStorage.removeItem("lastWeekADate");
        window.location.href = "../pages/uploadFile.html"
    }
}

wipeBtn.addEventListener("click", wipeData);

function resetWeek(){
    window.location.href = "../pages/validateCurrentWeek.html";
}

weekBtn.addEventListener("click", resetWeek);

function uploadImg(event){
    window.location.href = "../pages/uploadBackground.html";
}

bgBtn.addEventListener("click", uploadImg);