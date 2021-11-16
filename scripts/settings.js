// Code to alternate between settings cards using arrows

var settingsCardsRaw = document.getElementsByClassName("settingsCard");
var rightArrow = document.getElementById("rightArrow");
var leftArrow = document.getElementById("leftArrow");

var settingsDots = document.getElementsByClassName("dot")

var currentCardIndex = 0

var settingsCards = [];
for(var i=0; i<settingsCardsRaw.length; i++){
    settingsCards.push(settingsCardsRaw[i])
}

for(var i=0; i<settingsDots.length; i++){
    settingsDots[i].classList.remove("highlightDot")
}

settingsDots[0].classList.add("highlightDot")

settingsCards[currentCardIndex].style = `
z-index: 3
`

function moveCards(change){
    var currentCard = settingsCards[currentCardIndex % settingsCards.length]
    if((currentCardIndex % settingsCards.length) + 1 == settingsCards.length){
        var nextCard = settingsCards[0]
        var oldDot = settingsDots[settingsDots.length - 1]
        var newDot = settingsDots[0]
    }else{
        var oldDot = settingsDots[(currentCardIndex % settingsCards.length)]
        var newDot = settingsDots[(currentCardIndex % settingsCards.length) + 1]
        var nextCard = settingsCards[(currentCardIndex % settingsCards.length) + 1]
    }
    
    for(var i=0; i<settingsCards.length; i++){
        settingsCards[i].style = `
            z-index:1;
        `
    }

    for(var i=0; i<settingsDots.slength; i++){
        settingsDots[i].classList.remove("highlightDot")
    }
    oldDot.style = `
        animation-name: moveDotRight;
        animation-duration:250ms
    `

    currentCard.style = `
        z-index: 4;
        animation-name: moveLeftOff;
        animation-duration: 500ms;
    `
    nextCard.style = `
        z-index: 3;
    `
    
    setTimeout(() => {
        oldDot.classList.remove("highlightDot")
        newDot.classList.add("highlightDot")
        oldDot.style = `
            animation-name: moveDotLeft;
            animation-duration: 250ms;
        `
    }, 250);

    setTimeout(() => {
        
        currentCard.style = `
            z-index:1;
        `
        currentCardIndex += change
    }, 450);

}


rightArrow.addEventListener("click", function(event){
    if(!event.target.classList.contains("greyed")){
        moveCards(1)
    }
});

// Button functionality
var wipeBtn = document.getElementById("wipeBtn");
var resetBtn = document.getElementById("resetBtn");
var backgroundBtn = document.getElementById("bakgroundImgBtn");
var noteBtn = document.getElementById("noteBtn");

wipeBtn.addEventListener("click", function(event){
    localStorage.clear();
    window.location.href = "../pages/welcome.html"
});

resetBtn.addEventListener("click", function(event){
    localStorage.removeItem("weekNumber");
    localStorage.removeItem("lastWeekADAte");
    window.location.href = "../pages/validateCurrentWeek.html"
});

backgroundBtn.addEventListener("click", function(event){
    localStorage.removeItem("imgUrl");
    window.location.href = "../pages/uploadBackground.html"
});

noteBtn.addEventListener("click", function(event){
    window.location.href = "../pages/notesSplit.html"
});


