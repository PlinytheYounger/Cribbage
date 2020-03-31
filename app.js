/////PSUEDOCODE/////


///////////////////////////////
/////////// SETUP //
///////////////////////////////

// Setup is 2 player game, each player has a scorecard and set of different colored pegs, there is an instructions modal, there is a setting modal, there is a high score, there is a Start Game button
// There is a cribbage board in the middle with a deck of cards (face-down)

//There are 5 buttons > Settings, How to Play & Start Game
    // Settings & How to Play takes you to Modals that explain the game or allow you to change settings
    // 1) Settings > change volume, change colors or theme, set difficulty (easy, medium, hard), add helpful hints
    // 2) How to Play > Basic instructions to get started [Add-on: any time a new player has joined, add helpful hints and allow them to turn off if wanted] >>> Figure out how to have a player enter their name / store a high score
    // 3) Start Game > to start the gameplay (automatically chooses someone to start as "dealer")

// Winner > first player to make it 1 time around the board (121 points)

// Start the game by clicking the button

// Randomly draw cards for each person > highest card "deals" (or starts)

// Player 1 (starter) "deals" 6 cards to each person > [store in player arrays]
    // Whoever starts, each round it toggles to start from the other person (i.e. put cards in the other person's crib, the other person starts, etc. )

// Display human player cards so you can see them. Modal? 

///////////////////////////////
/////////// PLAYING THE GAME //
///////////////////////////////

// 1. Pick 2 cards to place in the crib (if you are starting, it's your crib) > store the chosen cards in a crib array
// 2. Whoever didn't deal - it's their turn first (non-dealer) 
// ROUND 1 //
    // A) If human didn't deal first, then you pick a card from your hand to play
    // B) click a card from your hand to place face up [gameplayCards array]
    // C) Next player goes >
    // toggle between players until a "go" or the total number of points equals 31
        // 2A - during gameplay, if the card makes the total of the gameplayCards array equals 15, 30, 31, is a pair or 3 in a row >> go to 2C, otherwise go to 2B ||| If the other player can't play anymore cards (each card will make them go over 31, then original player gets a "go" or another turn)
        // 2B - if no extra points, next player's turn
            // Computer randomly picks from a card in their hand (easy) or picks strategically (hard)
        //  2C - if player puts down card that sets gameplayCards array total equal to 15, 30 or 31

        // If either player earns points during gameplay, move the peg the appropriate amount of peg holes.

// POST-ROUND //
    // A) Total up points for each player
        // count up points for non-dealer array & add to score
        // count up points for dealer array & crib and add to score
        // use total scores to move pegs
    // B) move pegs accordingly to points

///////////////////////////////
/////////// CODE /////////////
///////////////////////////////

///// VARIABLES, OBJECTS & ARRAYS /////

// generate a deck of card objects & store it in an array > this will be the deck
    // each card object will contain:
        // suit
        // face
        // point value (for counting)
        // image
        // faceup / facedown (boolean)

const suit = ['clubs', 'spade', 'diamond', 'heart'];
const face = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', "Queen", "King"];
const deckArray = [];

class Deck {
    constructor(suit, face, faceUp = false) {
        this.suit = suit;
        this.face = face;
        this.faceUp = faceUp;
    }
    generateCards() {
        for (let i = 0; i < suit.length; i++) {
            for (let j = 0; j < face.length; j++) {
                const newCard = new Deck(suit[i], face[j], this.faceUp);
                deckArray.push(newCard);
            }
        }
    }
}

const newCard = new Deck('clubs', 'Ace');
newCard.generateCards();
console.log(deckArray);

// player1Array/player2Array = create an array to hold player 1 & player 2 cards (while in gameplay, these cards will change each hand) [should only hold 6 elements **// should be emptied after each round]
let player1Array = [];
let player2Array = [];

// cribArray = create an array to hold the crib during gameplay [should only hold 4 elements **// should be emptied after each round]
let cribArray = [];

// gameplayArray = create an array to hold the gameplay cards - in order to match with previous cards for points (pair, 3 of a kind)
let gameplayArray = [];

// totalPointsPlayer1 = Keeps track of player 1's total points through the game, each time the peg moves, add however many to this total
let totalPointsPlayer1;

// totalPointsPlayer2 = Keeps track of player 2's total points through the game, each time the peg moves, add however many to this total 
let totalPointsPlayer2;

// gameplayCounter = keeps track of the total of the cards in the gameplayArray for us in checkForPoints() function >> meaning have we reached 31 for the round? 
let gameplayCounter;

// dealer = used to toggle between players (i.e. whoever is dealer gets the crib, whoever isn't starts play & donates to the crib)
let dealer;

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
    // // 13. Player 1 cards
    // const $player1Cards = $('.hand');

///// FUNCTIONS /////
// randomComputerCard() = function to generate a random card from the player2Array

// CHOOSE DEALER//
const chooseDealer = () => {
    let num = Math.ceil(Math.random()*2);
    if (num === 1) {
        return dealer = "player1"; 
    } else if (num === 2) {
        return dealer = "player2";
    }
}

// PICK RANDOM CARDS FOR PLAYER ARRAYS ("DEAL") //
const dealCards = () => {
    // dealing 6 cards
    for (let i = 0; i < 6; i++) {
        // generate random number no greater than length of deckArray
        let number  = Math.floor(Math.random()*deckArray.length);
        // splice from deckArray
        deckArray.splice(number, 1);
        // check to make sure no duplicates push to playerArray
        player1Array.push(deckArray[number]);
    }
    console.log(player1Array);
    for (let i = 0; i < 6; i++) {
        let number  = Math.floor(Math.random()*deckArray.length);
        player2Array.push(deckArray[number]); 
        deckArray.splice(number, 1);  
    }
}


// CREATE DISPLAY (DIVS & H2s) FOR CARDS & ASSIGN VALUES // 
const displayCards = () => {
    for (let i = 0; i < player1Array.length; i++) {
        const $div = $('<div>').addClass('hand').appendTo($player1Div);
        $('<h2>').text(player1Array[i].face).appendTo($div).val(player1Array[i].face);
        $('<h2>').text(player2Array[i].suit).appendTo($div).val(player1Array[i].suit);
    }
    for (let j = 0; j < player2Array.length; j++) {
        const $div = $('<div>').addClass('hand').appendTo($player2Div);
        $('<h2>').text(player2Array[j].face).addClass('hidden').appendTo($div);
        $('<h2>').text(player2Array[j].suit).addClass('hidden').appendTo($div);
    }
    $player1Div.children().on('click', player1ToCrib);
}

// CHECK FOR COMPUTER GO //
// checkForComputerGo() = function to check whether player2Array cards values are each greater than the # of points left to 31 in the gamePlayArrray
    // >> iterate through array
        // >> if 

// START GAME //
// startGame() = when player clicks 'startGame' run startGame function
const startGame = () => {
    // EXTRA ADD: shuffle the deck using animation
    // Randomly choose "dealer"
    chooseDealer();
    console.log(dealer);
    // assign each player gameplay array 6 random cards from the deckArray
    dealCards();
    // EXTRA ADD: dealing the cards to the players using animation
    // Player 1 cards are face-up; Player 2 either disappear or face-down
    displayCards();
    // $player1Cards.on('click', player1ToCrib);
}

// PUT CARDS IN CRIB FUNCTIONS //

// listen for click event, then run function player1ToArray
const player1ToCrib = () => {
    let faceValue = $(event.currentTarget).children().eq(0).val();
    // pull value of suit & store in variable
    let suitValue = $(event.currentTarget).children().eq(1).val();
    // find the object in the player1Array that matches the values of the currentTarget DOM element
    const findObject = player1Array.find((object) => {
        // use above local variables 
        if (object.suit === suitValue && object.face === faceValue) {
            return object;
        }
    });
    let currentIndex = player1Array.indexOf(findObject);
    // add to cribArray
    cribArray.push(player1Array[currentIndex]);
    // remove from array
    player1Array.splice(`${currentIndex}`, 1);
    // remove from DOM
    $(event.currentTarget).remove(); 
    // call computerArrayToCrib function
    defineCallback();
};

// check to see if player1 has chosen 2 cards to put into crib
const defineCallback = () => {
    if (cribArray.length >= 2) {
        return moveComputerCardstoCrib();
    } else {
        return () => {}
    }
};

const moveComputerCardstoCrib = () => {
    for (let i = 0; i < 2; i++) {
        let num = Math.floor(Math.random()*player2Array.length);
        cribArray.push(player2Array[num]);
        // removes cards from player 2 array & from the DOM
        player2Array.splice(num, 1);
        $player2Div.children().eq(5).remove();
    }
    gameplay(player1Array, player2Array, cribArray);
};


// GAMEPLAY //
const gameplay = (player1Arr, player2Arr, cribArr) => {
    // non-dealer goes first
    console.log(player1Arr);
    console.log(player2Arr);
    console.log(cribArr);
    // If player 1 equals non-dealer
    if (dealer !== "player1") {
        // Then while the gameplayArray.length < 8
        if (gameplayArray.length < 8) {
            // >> Player 1 (human) gets to drag & drop into the Gameplay Cards pile (face-up)
            $player1Div.children().on('click', () => {
                // pull value of face & store in variable
                let faceValue = $(event.currentTarget).children().eq(0).val();
                // pull value of suit & store in variable
                let suitValue = $(event.currentTarget).children().eq(1).val();
                // create new card object from value to store in crib 
                const newCard = new Deck(suitValue, faceValue);
                // push to crib array
                gameplayArray.push(newCard);
                console.log(gameplayArray);
                // checkForGameplayPoints();
            });
        }
                // >> checkForGameplayPoints()
                // >> checkForRoundPoints()
                // >> checkForComputerGo()
            // >> then run randomComputerCard() function
                // >> checkForGameplayPoints()
                // >> checkForRoundPoints()
    }
};

    // Else if player 2 equals non-dealer
        // Then while the length of gameplayArray < 8  
            // >> checkForComputerGo()
            // >> run randomComputerCard()
                // >> checkForGameplayPoints()
                // >> checkForRoundPoints()
            // >> then human gets to choose a card
                // >> checkForGameplayPoints()
                // >> checkForRoundPoints()


    // >> Run the "checkForPoints" function to check to see if there are any gameplay points

// checkForGameplayPoints()
    // if the card placed makes the gameplayCounter total equal 15
        // >> current player gets +2 totalPoints
        // >> peg moves 2 holes
        // >> return
    // if the card placed equals the previous card
        // >> current player gets +2 totalPoints
        // >> peg moves 2
        // >> return
    // if the card placed equals the previous 2 cards (triplet)
        // >> current player gets +6 totalPoints
        // >> peg moves 6
        // >> return
    // if the card placed equals the previous 3 cards (double pair/4 of a kind)
        // >> current player gets +12 totalPoints
        // >> peg moves 12
        // >> return
    // EXTRA DIFFICULT - DO AS A DAY 2 ITEM //
    // if the card placed forms a run sequence with 2+ previous cards
        // >> add # of cards in run to totalPoints
        // >> return
    // reset this value every time it gets to 31 // or every time someone presses "go" [Need to figure out how to reset when someone presses go, while still counting points > add 1 to other player & reset?]

// checkForRoundPoints() = function to check whether the gameplayArray equals 8 and to add up end-of-game points
    // If gameplayArray.length === 8 then end round & count points
        // FOR player1Array {
            // different sorting methods for each? 
            // points (store in object?)
            // each combo that equals 15 is 2 points
            // each combo that is a pair equals 2 points
            // each combo that is a 3+ cards in sequence, count 1 per card
            // 4 cards of the same suit, 1 per card
            // If jack is the same suit as flipped card in hand or crib, +1 point
        // }
        // FOR player2Array {
            // different sorting methods for each? 
            // points (store in object?)
            // each combo that equals 15 is 2 points
            // each combo that is a pair equals 2 points
            // each combo that is a 3+ cards in sequence, count 1 per card
            // 4 cards of the same suit, 1 per card
            // If jack is the same suit as flipped card in hand or crib, +1 point
        // }
        // FOR crib {}


///// EVENT LISTENERS & HANDLERS /////

// On click of settings > display settings options
// On click of How to Play > display instructions
// On click of Start Game > run startGame() function
$startGame.on('click', startGame);


});
