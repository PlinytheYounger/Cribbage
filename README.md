# Cribbage2.0
## Classic Cribbage game brought to life online!
================================================

## Game Summary

Cribbage is a classic (usually 2-player, but possibly more) card game that involves a 52 card deck, and usually a cribbage board and small pegs for the board.

This game was and is a staple in my house growing up, it is fairly simple in theory, but involves many subtleties, strategy and gambling to score the maximum amount of points each round. 

1. To start, players cut the deck and highest card drawn becomes the first dealer. After each round, the dealer switches.
2. Dealer hands out 6 cards for each player
3. Each player contributes 2 cards from their respective hands to what is called the "crib" - face-down. The crib is "owned" by whoever is dealer and switches each round of play. It is essentially "extra" points for the dealer at the end of round.
4. The pone (or non-dealer) then cuts the deck and flips the starter card - the starter card is used at the end of the round to count points.
5. The pone starts - flipping up a card of their choice - and says the value out loud (face cards are 10, Ace is 1) - then the dealer places a card face-up, repeating until they either reach 31 or the cards left in their hands would go over 31. Points can be gained throughout play according to some rules.
6. Once all cards are played, the 2nd round of scoring begins using their original hands. 

### Scoring Points
* The starter card is used to "fill" out each hand - players can both use the 5th card to add to their points
* A total of 15 is 2 points (Jack + 5, 10 + 2 + 3, etc)
* Pairs are worth 2; therefore 3 of a kind is 6 points (3 sets of pairs)
* Runs of 3 cards total or higher are 1 point per card


For a bit of [history](https://en.wikipedia.org/wiki/Cribbage).

## Contributors
Me

## Technology
* HTML5
* CSS
* Javascript
* jQuery

## Wireframe

![alt-text][wireframe]
[wireframe]: wireframe/Desktop_Cribbage.png

## Challenges:
- Creating the cribArray and gameplayCardsArray - both require both adding a new card object to each array and removing said object from the player arrays. For the computer-generated hand & crib, it's relatively easy as I was able to use for loops to iterate and add cards. This way, I could use "i" or whichever variable I was using to remove the correct card from the array.
    
    With the human player, it's slightly trickier - the DOM element is simply a div with 2 h2 elements that represent the card, but doesn't actually contain the values needed. 

    In order to ADD the element, it was a matter of creating a new card object using the same values as represented in the DOM element, pulling those from the currentTarget and assigning them to create the new object in the targeted array (crib or gameplay for example).

    In order to REMOVE the element, which took me the longest to figure out - I tried various combinations of for loops, trying to add a value I could call in the objects themselves, and then finally, trying to use the currentTarget h2 values - which are a suit & face value - to figure out how to match them to the array to find the right object index in order to splice it from the array. 

    Used the .find() method to find the object in question using the DOM element values, then finding the index of said object, and then splicing it from the array. 

    Since the arrays I'm deleting from won't be used again after each round (everything will have to get re-shuffled) - I am able to mutate the arrays as needed vs. trying to preserve everything. 
