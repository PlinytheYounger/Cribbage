const listStyle = {
    listStyle: 'none',
}

export default function Instructions() {
    return(
    <div class="container">

        <header>
            <h1>How to Play Cribbage</h1>
        </header>

        <div class="video">
            <iframe title="instructions" width="560" height="315" src="https://www.youtube.com/embed/ttkfRm5pZr4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" class="hideVideo" allowfullscreen></iframe>
        </div>

        <main>
            <div class="history">
                <h2>Summary</h2>
                    <p>Cribbage, or crib, is a card game traditionally for two players, but commonly played with three, four or more, that involves playing and grouping cards in combinations which gain points. Cribbage has several distinctive features: the cribbage board used for score-keeping, the eponymous crib —a separate hand counting for the dealer —two distinct scoring stages (the play and the show) and a unique scoring system including points for groups of cards that total fifteen. 

                    Many games are decided by just a single digit points margin, with the edge going to the experienced players who understand the odds and their position on the board.
                    
                    Luck-of-the-deal and the cut plays a role in the outcome of games, but over time experienced players will have an edge over novices.
                
                    <b>The object</b> of the game is to be the first player to score 121 points.</p>
                <h2>Setup</h2>
                <ul style={listStyle}>
                    <li>Uses a standard 52-card pack</li>
                    <li>Player is determined randomly.</li>
                    <li>Dealer "deals" 6 cards to each player.</li>
                    <li>Dealer has the first crib - each player picks 2 cards to place in the crib each round. Crib switches ownership with the dealer</li>
                    <li>After the crib is laid away, the starter card (random card) is flipped.</li>
                    <li>Once the started card is flipped, the play phase starts for round 1</li>
 
                </ul>
                <h2>How to Play</h2>
                <div id="instructions">
                    <ul style={listStyle}>
                        <li><b>Non-dealer starts</b> and lays one of their cards face-up on the table. Then the dealer - alternating turns until all cards have been laid on the table. These hands will be used at the end of the round to tally points.</li>
                        <li><b>As each person plays, they announce a running total by the addition of the last card to all those previously played.</b> I.e. if there is a 3 and 4 on the table and I place a 5, the total I say is "12" instead of 5. <i>This is counted by the "Gamplay Count" counter.</i></li>
                        <li><b>During play, the running total may never be carried beyond 31.</b> If a player cannot add another card without exceeding 31, the count returns to zero and play resumes, starting with the person who couldn't play.</li>
                        <li>After all 8 cards have been played, points are tallied and added to the player's score.</li>
                        <li>Whoever is the dealer, gets to also tally points from the crib to add to their score.</li>
                        <li>Cards are re-dealt, changing dealers, and the crib then play phases begin again - counting points at the end.</li>
                        <li>Normally, points are tallied using pegs in a board, but a piece of paper can be used just as easily (or a computer function in this case)</li>
                        <li><b>The first person to reach 121 points (or cross the finish line with the pegs) is the winner!</b></li>
                    </ul>
                    <h2>Points</h2>
                    <ul style={listStyle}>
                        <li>Each combo of cards that totals 15: <b>2 points (face cards = 10 count)</b></li>
                        <li>Each pair of cards of the same rank: <b>2 points</b></li>
                        <li>Each combo of 3 or more cards in sequence (run): <b>1 point for each card in run</b></li>
                        <li>4 cards of the same suit in hand (excluding crib & starter): <b>1 point per card in flush</b></li>
                        <li>His Nobs - Jack of the same suit as starter in hand or crib: <b>1 point</b></li>
                    </ul>
                </div>
            </div>
        </main>

    </div>
    )
}