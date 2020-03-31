# Cribbage2.0
Classic Cribbage game brought to life online!



Challenges:
- Creating the cribArray and gameplayCardsArray - both require both adding a new card object to each array and removing said object from the player arrays. For the computer-generated hand & crib, it's relatively easy as I was able to use for loops to iterate and add cards. This way, I could use "i" or whichever variable I was using to remove the correct card from the array.
    
    With the human player, it's slightly trickier - the DOM element is simply a div with 2 h2 elements that represent the card, but doesn't actually contain the values needed. 

    In order to ADD the element, it was a matter of creating a new card object using the same values as represented in the DOM element, pulling those from the currentTarget and assigning them to create the new object in the targeted array (crib or gameplay for example).

    In order to REMOVE the element, which took me the longest to figure out - I tried various combinations of for loops, trying to add a value I could call in the objects themselves, and then finally, trying to use the currentTarget h2 values - which are a suit & face value - to figure out how to match them to the array to find the right object index in order to splice it from the array. 

    Used the .find() method to find the object in question using the DOM element values, then finding the index of said object, and then splicing it from the array. 

    Since the arrays I'm deleting from won't be used again after each round (everything will have to get re-shuffled) - I am able to mutate the arrays as needed vs. trying to preserve everything. 
