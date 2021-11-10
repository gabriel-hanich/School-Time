var settingsCardsRaw = document.getElementsByClassName("settingsCard");
var rightArrow = document.getElementById("rightArrow");
var leftArrow = document.getElementById("leftArrow");

var currentCardIndex = 0

var settingsCards = [];
for(var i=0; i<settingsCardsRaw.length; i++){
    settingsCards.push(settingsCardsRaw[i])
}

settingsCards[currentCardIndex].style = `
    z-index: 3
`

function moveCards(change){
    var currentCard = settingsCards[currentCardIndex % 3]
    if((currentCardIndex % 3) + 1 == settingsCards.length){
        var nextCard = settingsCards[0]
    }else{
        var nextCard = settingsCards[(currentCardIndex % 3) + 1]
    }
    
    console.log(currentCard)
    console.log(nextCard)
    for(var i=0; i<settingsCards.length; i++){
        settingsCards[i].style = `
            z-index:1;
        `
    }

    currentCard.style = `
        z-index: 4;
        animation-name: moveLeftOff;
        animation-duration: 500ms;
    `
    nextCard.style = `
        z-index: 2
    `
    
    setTimeout(() => {
        console.log("HIDDEN")
        currentCard.style = `
            z-index:1;
        `
        currentCardIndex += change
    }, 500);

}


rightArrow.addEventListener("click", function(event){
    if(!event.target.classList.contains("greyed")){
        moveCards(1)
    }
});
