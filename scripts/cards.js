// Code to alternate between settings cards using arrows
var settingsCardsRaw = document.getElementsByClassName("card");
var rightArrow = document.getElementById("rightArrow");
var leftArrow = document.getElementById("leftArrow");

var settingsDots = document.getElementsByClassName("dot")

var currentCardIndex = 0

// Convert htmlCollection to Array
var settingsCards = [];
for(var i=0; i<settingsCardsRaw.length; i++){
    settingsCards.push(settingsCardsRaw[i])
}

// Ensure no dots are highlighted
for(var i=0; i<settingsDots.length; i++){
    settingsDots[i].classList.remove("highlightDot")
}
 // Set the 1st dot to be highlighted
settingsDots[0].classList.add("highlightDot")

// Bring current card to top (z-index 3 = top)
settingsCards[currentCardIndex].style = `
z-index: 3
`

function moveCards(change){ // Function to change the card displayed
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
    
    for(var i=0; i<settingsCards.length; i++){ // Set all cards to the back
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
