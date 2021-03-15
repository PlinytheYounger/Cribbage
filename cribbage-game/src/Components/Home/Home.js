import cribbageBoard from '../../images/cribbageBoardTemplate.jpg';
import cardBack from '../../images/cardback.jpeg';
import singleCard from './Card/Card';
import {useState} from 'react';
import {Button} from '@material-ui/core'
import Card from './Card/Card'

/*-----------------------
STYLING
-------------------------*/
const sectionStyle = {
    backgroundColor: '#d3d3d3',
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    justifyContent: 'space-around'
}

const handStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
}

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around'
}

const buttonStyle = {
    backgroundColor: 'white'
}

/*-----------------------
COMPONENT
-------------------------*/

export default function Home() {
    
    const [ gameState, setGameState ] = useState({
        deck: [],
        playerName: '',
        totalPlayerOnePoints: 0,
        totalPlayerTwoPoints: 0,
        player1Hand: [],
        player2Hand: [],
        starterCard: {},
        gameplayCounter: 0,
        dealer: ''
    })

    const suit = ['Clubs', 'Spades', 'Diamonds', 'Hearts'];
    const vals = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    const store = {
        suit: suit,
        vals: vals
    }

    class Cards {
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
    }

    class Deck {
        constructor() {
            this.cards = []
        }
        generateDeck(deckObject) {
            let deckArray = [];
            for (let suit of deckObject.suit) {
                const suitArr = deckObject.vals.map((val) => {
                        return new Cards(suit, val)
                });
                deckArray = [...suitArr, ...deckArray];
            }
            this.cards = deckArray;
        }
    }

    const createDeck = () => {
        const myDeck = new Deck();
        myDeck.generateDeck(store)
        setGameState({
            ...gameState,
            deck: myDeck.cards
        })
    }

    const dealCards = () => {
        // dealing 6 cards to each player
        let player1Array = [];
        let player2Array = [];
        let i = 0;
        while(i < 6) {
            let number  = Math.floor(Math.random()*gameState.deck.length);
            player1Array.push(gameState.deck[number])
            setGameState({
                deck: gameState.deck.splice(number, 1)
            })
            i++
        } 
        while(i < 12) {
            let number  = Math.floor(Math.random()*gameState.deck.length);
            console.log(number)
            player2Array.push(gameState.deck[number])
            setGameState({
                deck: gameState.deck.splice(number, 1)
            })
            i++
        } 

        setGameState({
            ...gameState,
            player1Hand: player1Array,
            player2Hand: player2Array
        })
    }

    return(
    <>
        <section style={sectionStyle}>
            <div style={buttonContainerStyle}>
                <Button onClick={createDeck} style={buttonStyle}>
                    <h2>Start New Game</h2>
                </Button>
                <Button onClick={dealCards} style={buttonStyle}>
                    <h2>Deal Cards</h2>
                </Button>
            </div>
            {gameState.player1Hand.length > 0 && <h1>Player 1</h1>}
            <div style={handStyle}>
                {gameState.player1Hand.length > 0 && gameState.player1Hand.map((card, id) => {
                    return(
                        <Card card={card} key={`${card.face}_${card.suit}`}/>
                    )
                })}
            </div>
            {gameState.player1Hand.length > 0 && <h1>Player 2</h1>}
            <div style={handStyle}>
                {gameState.player2Hand.length > 0 && gameState.player2Hand.map((card, id) => {
                    return(
                        <Card card={card} key={`${card.face}_${card.suit}`}/>
                    )
                })}
            </div>
        </section>
    </>
    )
}