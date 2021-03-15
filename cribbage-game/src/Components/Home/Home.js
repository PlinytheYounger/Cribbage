import cribbageBoard from '../../images/cribbageBoardTemplate.jpg';
import cardBack from '../../images/cardback.jpeg';
import Card from './Card/Card';
import {useState} from 'react';

const sectionStyle = {
    display: 'flex',
    flexDirection: 'row',
}

export default function Home() {
    const [ gameState, setGameState ] = useState({
        deck: null,
        playerName: '',
        totalPlayerOnePoints: '',
        totalPlayerTwoPoints: ''
    })

    return(
    <>
        <main>
            <div id="board">
                <img src={`${cribbageBoard}`} alt="cribbage board"/>
            </div>
        </main>
        <section style={sectionStyle}>
            <Card image={`${cardBack}`} id="player1" score="0"  />
            <Card image={`${cardBack}`} id="starterCard" />
            <Card image={`${cardBack}`} id="gameplayCards" score="0"  />
            <Card image={`${cardBack}`} id="crib" />
            <Card image={`${cardBack}`} id="player2" score="0"  />
        </section>
    </>
    )
}