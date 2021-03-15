

export default function singleCard(props) {
    const cardStyle = {
        backgroundColor: 'white',
        border: 'black 2px solid',
        borderRadius: '15px',
        width: '16%',
        height: '25vh',
        display: 'grid',
        gridTemplateColumns: '33% 33% 33%',
        gridTemplateRows: '20% 20% 20% 20%' 
    }
    let color = props.card.suit === 'Hearts' || props.card.suit === 'Diamonds' ? 'red' : 'black';

    const firstStyle = {
        color: color,
        gridColumn: '1/2',
        gridRow: '1/2'
    }

    const secondStyle = {
        color: color,
        gridColumn: '3/4',
        gridRow: '5/6'
    }

    const thirdStyle = {
        color: color,
        gridColumn: '1/2',
        gridRow: '2/3'
    }

    const fourthStyle = {
        color: color,
        gridColumn: '3/4',
        gridRow: '4/5'
    }

    const convertToUnicode = () => {
        if(props.card.suit === 'Hearts') {
            return '\u2665';
        } else if(props.card.suit === 'Spades') {
            return '\u2660';
        } else if(props.card.suit === 'Diamonds') {
            return '\u2666';
        } else {
            return '\u2663';
        }
    }

    const convertUnicode = (input) => {
        return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
            let charcode = parseInt(b,16);
            return String.fromCharCode(charcode);
        });
    }

    return(
        <div style={cardStyle} >
            <h3 style={firstStyle}>{props.card.face}</h3>
            <h3 style={secondStyle}>{props.card.face}</h3>
            <h3 style={thirdStyle}>{convertUnicode(convertToUnicode())}</h3>
            <h3 style={fourthStyle}>{convertUnicode(convertToUnicode())}</h3>
        </div>
    )
}