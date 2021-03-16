import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';


const linkStyle = {
    textDecoration: 'none',
    color: '#5e8d5a'
}

const navStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
}

const barTheme = {
  backgroundColor: '#c6d7b9',
  color: '#5e8d5a',
  fontSize: '24px',
  height: '10vh',
  display: 'flex',
  flexDirection: 'space-between'
};

export default function Header() {
    return(
        <AppBar position="static" >
            <Toolbar style={barTheme}>
                {/*<IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton> Need to add something here? */}
                <Typography variant="h2" >
                    Cribbage
                </Typography>
                <div style={navStyle}>
                    <Button style={linkStyle} color="inherit">
                        <Link to="/" style={linkStyle}>
                            <h2>Home</h2>
                        </Link>
                    </Button>
                    <Button style={linkStyle} color="inherit">
                        <Link to="/instructions" style={linkStyle}>
                            <h2>How to Play</h2>
                        </Link>
                    </Button>
                    <Button style={linkStyle} color="inherit">
                        <Link to="#" style={linkStyle}>
                            <h2>High Scores</h2>
                        </Link>
                    </Button>
                </div>
            </Toolbar>
        </AppBar> 
    )
}