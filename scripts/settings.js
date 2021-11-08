var settingsCards = document.getElementsByClassName("settingsCard");
var currentCard = 0;
var lastCard = 1
var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");

leftArrow.classList.add("greyed")

function updateCards(){
    if(currentCard - lastCard == 1){
        settingsCards[currentCard - 1].style = `
            animation-name: move;
            animation-duration: 250ms;
            animation-timing-function: linear;
        `
    }


    setTimeout(() => {
        for(var i=0; i<settingsCards.length; i++){
            settingsCards[i].classList.add("hidden")
        }
        settingsCards[currentCard].classList.remove("hidden")
    }, 250);

    leftArrow.classList.remove("greyed")
    rightArrow.classList.remove("greyed")

    if(currentCard == 0){
        leftArrow.classList.add("greyed")
    }else if(currentCard == settingsCards.length - 1){
        rightArrow.classList.add("greyed")
    }
}


leftArrow.addEventListener("click", function(event){
    if(!event.target.classList.contains("greyed")){
        currentCard -= 1
        updateCards();
    }
});


rightArrow.addEventListener("click", function(event){
    if(!event.target.classList.contains("greyed")){
        currentCard += 1
        updateCards();
    }
});

