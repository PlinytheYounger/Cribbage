
///// VARIABLES, OBJECTS & ARRAYS /////
// player1Array/player2Array = create an array to hold player 1 & player 2 cards (while in gameplay, these cards will change each hand) [should only hold 6 elements **// should be emptied after each round]
let player1Array = [];
let player2Array = [];

// cribArray = create an array to hold the crib during gameplay [should only hold 4 elements **// should be emptied after each round]
let cribArray = [];

// gameplayArray = create an array to hold the gameplay cards - in order to match with previous cards for points (pair, 3 of a kind)
let gameplayArray = [];

// starterCard array
let starterCard = [];

// totalPointsPlayer1 = Keeps track of player 1's total points through the game, each time the peg moves, add however many to this total
let totalPointsPlayer1 = 0;

// totalPointsPlayer2 = Keeps track of player 2's total points through the game, each time the peg moves, add however many to this total 
let totalPointsPlayer2 = 0;

// gameplayCounter = keeps track of the total of the cards in the gameplayArray for us in checkForPoints() function >> meaning have we reached 31 for the round? 
let gameplayCounter = 0;

// dealer = used to toggle between players (i.e. whoever is dealer gets the crib, whoever isn't starts play & donates to the crib)
let dealer = "player2";

// player array copies
let pointsArray1;
let pointsArray2;

// player2 Go to keep track of "gos"
let player2Go = false;

// player counter
let playerCounter = 1;

// generate a deck of card objects & store it in an array > this will be the deck
    // each card object will contain:
        // suit
        // face
        // point value (for counting)
        // image >>>>>> EXTRA ADD THIS
        // faceup / facedown (boolean)

const suit = ['Clubs', 'Spades', 'Diamonds', 'Hearts'];
const vals = [1,2,3,4,5,6,7,8,9,10,11,12,13];

const store = {
    suit: suit,
    vals: vals
}

class Card {
    constructor(suit, val) {
        this.suit = suit
        this.face = val
            if (val === 11) {
                this.face = 'Jack'
            } else if (val === 12) {
                this.face = 'Queen'
            } else if (val === 13) {
                this.face = 'King'
            } else if (val === 1) {
                this.face = 'Ace'
            }
        this.name = `${this.face} of ${suit}`
        if (val > 10) {
            this.val  = 10
        } else {
            this.val = val
        }
    }
    // displayCards(arr1, arr2) {

    // }
}

class Deck {
    constructor() {
        this.cards = []
        this.player1Hand = []
        this.player2Hand = []
        this.crib = []
    }
    generateDeck(deckObject) {
        let deckArray = [];
        for (let suit of deckObject.suit) {
            const suitArr = deckObject.vals.map((val) => {
                    return new Card(suit, val)
            });
            deckArray = [...suitArr, ...deckArray];
        }
        this.cards = deckArray;
    }
}

const myDeck = new Deck();
myDeck.generateDeck(store);
console.log(myDeck.cards);

// jquery onload function
$(() => {

// CACHED DOM ELEMENTS:
    // 1. Settings Modal Button
    const $settings = $('#modals').children('button').eq(0);
    // 2. How to Play Modal Button
    const $howTo = $('#modals').children('button').eq(1);
    // 3. Start Game button
    const $startGame = $('#startGame');
    // 4. Gameboard [to manipulate pegs / append pegs to it]
    const $gameboard = $('#board');
    // 5. Pegs (4) - [For ease, players always have some colored pegs]
    const $peg1 = $('#board > h2');
    // 6. Starter card
    const $starterCard = $('#starterCard');
    // 7. Go Button
    const $go = $('.go');
    // 8. Player 1 Score text, Player 2 score text
    const $player1Score = $('section > div:first > h2 > span');
    const $player2Score = $('section > div:last > h2 > span');
    // 9. Player 1 hand, Gameplay Cards, Crib, Player 2 hand
    const $player1Hand = $('#player1').children('h2').eq(1).children('span');
    // 10. Player 1
    const $player1Div = $('#player1');
    // 11. Player 2
    const $player2Div = $('#player2');
    // 12. Crib Button
    const $cribButton = $('#cribButton');
    // // 13. gameplay Div
    const $gameplayCards = $('#gameplayCards');
    

///// FUNCTIONS /////

// CHOOSE DEALER//
// const chooseDealer = () => {
//     let num = Math.ceil(Math.random()*2);
//     if (num === 1) {
//         alert(`Player 1 is the dealer, Player 2 will play first after the crib is populated.`)
//         $('#crib').children('h2').children().text(`Player 1's `)
//         return dealer = "player1"; 
//     } else if (num === 2) {
//         alert(`Player 2 is the dealer, Player 1 will play first after the crib is populated.`)
//         $('#crib').children('h2').children().text(`Player 2's `)
//         return dealer = "player2";
//     }
// }

//=====================
// dealCards()
// Runs upon click of 'Start Game' button / running startGame() 
// deals 6 cards to each player
//=====================

const dealCards = () => {
    // dealing 6 cards
    for (let i = 0; i < 12; i++) {
        // generate random number no greater than length of deckArray
        let number  = Math.floor(Math.random()*myDeck.cards.length);
        // toggle between adding to the player1Array and adding to the player2Array with if statement
        if (i % 2 != 0) {
            // push new object to player1Array
            player1Array.push(myDeck.cards[number]);
            // create new div and add to player1Div / 'hand'
            const $div = $('<div>').addClass('hand').appendTo($player1Div);
            // create new h2 and attach to div - give value of 'name' to display
            $('<h2>').text(myDeck.cards[number].name).appendTo($div);
            // splice from deckArray
            myDeck.cards.splice(number, 1);
        } else if (i % 2 === 0) {
            player2Array.push(myDeck.cards[number]); 
            const $div = $('<div>').addClass('hand').appendTo($player2Div);
            $('<h2>').text(myDeck.cards[number].name).addClass('hidden').appendTo($div);
            myDeck.cards.splice(number, 1);
        } 
    }
}

const flipStarterCard = () => {
    let number  = Math.floor(Math.random()*myDeck.cards.length);
    starterCard.push(myDeck.cards[number]);
    const $div = $('<div>').addClass('hand').appendTo($starterCard);
    $('<h2>').text(myDeck.cards[number].name).appendTo($div);
    myDeck.cards.splice(number, 1);
}

//=====================
// startGame()
// Runs upon click of 'Start Game' button.  
// Chooses a 'dealer' & deals 6 cards to each player
//=====================

// startGame() = when player clicks 'startGame' run startGame function
const startGame = () => {
    // EXTRA ADD: shuffle the deck using animation
    // Randomly choose "dealer"
    // chooseDealer();
    // assign each player gameplay array 6 random cards from the deckArray & display for player 1
    dealCards();
    alert(`Player 1 > click on 2 cards to choose for the crib`);
    console.table(cribArray);
    console.table(player1Array);
    console.table(pointsArray1);
    console.table(player2Array);
    // EXTRA ADD: dealing the cards to the players using animation
    $player1Div.children('.hand').on('click', player1ToCrib);
}

//=====================
// CRIB FUNCTIONS
// player1ToCrib(); defineCallback(); moveComputerCardstoCrib()
// Runs upon click of one of cards in the player 1 Div; checks to see if player1 has placed 2 cards in the cribArray
// Once you have picked 2 cards to put into the crib, picks 2 random cards from the player2Array to add to crib and runs gameplay function to start the game
//=====================

// listen for click event, then run function player1ToArray
const player1ToCrib = (event) => {
        // find the object in the player1Array that matches the values of the currentTarget DOM element
        const name = (element) => {
            return element.name === `${$(event.target).text()}`;
        }
        
        let currentIndex = player1Array.findIndex(name);
        // add to cribArray
        cribArray.push(player1Array[currentIndex]);
        // add element to cribDiv
        const $div = $('<div>').addClass('hand').appendTo($('#crib'));
        $('<h2>').text(player1Array[currentIndex].name).appendTo($div);
        // remove from array
        player1Array.splice(`${currentIndex}`, 1);
        // remove from DOM
        $(event.currentTarget).remove(); 
        // call defineCallback to check that human added 2 cards to crib
        defineCallback();
};

// check to see if player1 has chosen 2 cards to put into crib
const defineCallback = () => {
    if (cribArray.length === 2) {
        return moveComputerCardstoCrib();
    } else {
        return () => {}
    }
};

// picks 2 random cards from player2Array to add to cribArray after player1 has clicked 2 cards
const moveComputerCardstoCrib = () => {
    for (let i = 0; i < 2; i++) {
        let num = Math.floor(Math.random()*player2Array.length);
        cribArray.push(player2Array[num]);
        // removes cards from player 2 array & from the DOM
        player2Array.splice(num, 1);
        $player2Div.children().eq(5).remove();
        const $div = $('<div>').addClass('hand').appendTo($('#crib'));
        $('<h2>').text(myDeck.cards[num].name).addClass('hidden').appendTo($div);
    }
    if (cribArray.length === 4) {
        $player1Div.children('.hand').off();
        pointsArray1 = [...player1Array];
        pointsArray2 = [...player2Array];
        flipStarterCard();
        alert(`Time to play!`);
        gameplay();
    }
};

//=====================
// GAMEPLAY FUNCTIONS
// gameplay()
// player2Deal()
// player1Deal()
// checkForGo()
// checkForGameplayPoints()
// randomComputerCard()
//=====================

const gameplay = () => {
    $player1Div.children('.hand').on('click', player1);
}

const player1 = (event) => {
    // 'on, click' > take current object, findIndex using the object and push element to gameplay array
        // find the object in the player1Array that matches the values of the currentTarget DOM element
        const name = (element) => {
            if (element.name === `${$(event.target).text()}`) {
                return element.name;
            } 
        }
        let currentIndex = player1Array.findIndex(name);
        // add to gameplayArray
        gameplayArray.push(player1Array[currentIndex]);
        // add value to gameplayCounter
        let num = player1Array[currentIndex].val;
        // alert what the human plays
        alert(`Player 1 played ${player1Array[currentIndex].name}`);
        gameplayCounter += num;
        $gameplayCards.children('h2:last').children().text(`${gameplayCounter}`);
        // add element to gameplayCards Div
        const $div = $('<div>').addClass('hand').appendTo($gameplayCards);
        $('<h2>').text(player1Array[currentIndex].name).appendTo($div);
        // remove from array
        player1Array.splice(`${currentIndex}`, 1);
        // remove from DOM
        $(event.currentTarget).remove(); 

        endOfHand();
}

const player2 = () => {
    
    const name = (element) => {
        // if (element.val <= (31 - gameplayCounter)) {
            return element.name;
        // }
    }
    let currentIndex = player2Array.findIndex(name);
    
    // add to gameplayArray
    gameplayArray.push(player2Array[currentIndex]);

    let num = player2Array[currentIndex].val;
    // alert what the computer plays
    alert(`Player 2 played ${player2Array[currentIndex].name}`);
    gameplayCounter += num;
    $gameplayCards.children('h2:last').children().text(`${gameplayCounter}`);
    // add element to gameplayCards Div
    const $div = $('<div>').addClass('hand').appendTo($gameplayCards);
    $('<h2>').text(player2Array[currentIndex].name).appendTo($div);
    // remove from array
    player2Array.splice(`${currentIndex}`, 1);
    // remove from DOM
    $player2Div.children('.hand').eq(0).remove();
    endOfHand();
}

// // endOfHand() function - if gameplayCounter === 31 or both players "go"
const endOfHand = () => {
    if (gameplayArray.length % 2 !== 0) {
        player2();
    } else if (player1Array.length === 0 && player2Array.length === 0) {
        endOfRound();
    } else {
        return () => {}
    }
}

// endOfRound() function - check to see if length of gameplayArray is 8
const endOfRound = () => {
    addCards();
    checkForPair(pointsArray1);
    checkForPair(pointsArray2);
    checkForPair(cribArray);
    gameplayCounter = 0;
    alert(`Player 1 Score: ${totalPointsPlayer1}! Player 2 Score: ${totalPointsPlayer2}!`);
    nextRound();
}

// function to add the cards back to the correct player for "counting"
const addCards = () => {
    $gameplayCards.children('h2:last').children().text(`${gameplayCounter}`);
    for (let i = 0; i < pointsArray1.length; i++) {
        const $div = $('<div>').addClass('hand').appendTo($player1Div);
        $('<h2>').text(pointsArray1[i].name).appendTo($div);
    }
    for (let i = 0; i < pointsArray2.length; i++) {
        const $div = $('<div>').addClass('hand').appendTo($player2Div);
        $('<h2>').text(pointsArray2[i].name).appendTo($div);
    }
    for (let i = 0; i < gameplayArray.length; i++) {
        $gameplayCards.children('.hand').remove();
    }
    alert(`Time to count points for the round!`);
    for (let i = 0; i < cribArray.length; i++) {
        $('#crib').children('.hand').children().css('opacity', 1);
    }
}

// check for pairs in each array
const checkForPair = (array) => {
    let newArray = [...array];
    newArray.push(starterCard[0]);
    const values = (object) => {
        return object.face;
    }
    let faceArray = newArray.map(values);
    // create empty object
    let faceFrequency = {}
    // loop through array
    faceArray.forEach((element) => {
        if (faceFrequency[element]) {
            faceFrequency[element]++;
        } else {
            faceFrequency[element] = 1;
        }
    });

    for (let element in faceFrequency) {
        if (faceFrequency[element] === 2) {
            if (array === totalPointsPlayer1) {
                totalPointsPlayer1+=2;
                $player1Score.text(`${totalPointsPlayer1}`);
            } else if (array === totalPointsPlayer2) {
                totalPointsPlayer2+=2;
                $player2Score.text(`${totalPointsPlayer2}`);
            } else if (array === cribArray) {
                if (dealer === 'player2') {
                    totalPointsPlayer2+=2;
                    $player2Score.text(`${totalPointsPlayer2}`);
                } else if (dealer === 'player1') {
                    totalPointsPlayer1+=2;
                    $player1Score.text(`${totalPointsPlayer1}`);
                }
            }
        }
    }
}

// check for matches equal to 15
const checkForFifteen1 = () => {
    const values = (object) => {
        return object.value;
    }
    let valueArray = pointsArray1.map(values);
    console.log(faceArray);

    // create empty object
    let faceFrequency = {}
    // loop through array
    faceArray.forEach((element) => {

    })
}

// move to next round
const nextRound = () => {
    alert(`Next Round!`)
    gameplayCounter = 0;
    nextDealer();
    console.log(dealer);
    resetDom();
    myDeck.generateDeck(store);
    startGame();
    console.table(player2Array);
    console.table(player1Array);
    // if (dealer === 'player2') {
    //     player2();
    // } else {
    //     $player1Div.children('.hand').on('click', player1);
    // }
}

// update player counter / update dealer
const nextDealer = () => {
    playerCounter++
    if (playerCounter % 2 === 0) {
        dealer === 'player1';
    } else {
        dealer === 'player2';
    }
}

// resetDom function sets up game for next round, emptying arrays, setting gameplay count to 0, generating new deck
const resetDom = () => {
    pointsArray1 = [];
    pointsArray2 = [];
    $('#crib').children('.hand').remove();
    $player2Div.children('.hand').remove();
    $player1Div.children('.hand').remove();
}


///// EVENT LISTENERS & HANDLERS /////

// On click of settings > display settings options
// On click of How to Play > display instructions
// On click of Start Game > run startGame() function
$startGame.on('click', startGame);


});
