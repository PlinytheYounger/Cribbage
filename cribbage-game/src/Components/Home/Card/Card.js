

export default function Card(props) {
    let title = '';
    const updateCard = () => {
        if(props.id === 'gameplayCards') {
            title = 'Pegging Cards'
            return (
                <> 
                    <h2>{title}</h2>
                    <h2>Round Count: <span class="grow">{props.score}</span></h2>
                </>
            )
        } else if (props.id === 'crib') {
            title = 'Crib'
            return <h2>{title}</h2>;
        } else if (props.id === 'starterCard') {
            title = 'Flipped Card';
            return <h2>{title}</h2>
        } else {
            title = props.id;
            return (
                <> 
                    <h2>{title}</h2>
                <h2>Score: <span class="grow">{props.score}</span></h2>
                </>
            )
        }
    }

    return(
        <div class="card" id={props.id}>
            <img src={props.image} alt="card"/>
            <h2>{title}</h2>
            {/* <!-- <button class="go">Go!</button> --> */}
            {updateCard()}
        </div>
    )
}