import React from "react";
import { Button , Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from '../Create/Create'
import Play from '../Play/Play'
import playImg from '../../assets/playButton.png'


function DashboardItem(props) {
    return(
        <>
            {hidden ? <li>
                <h1>Song Title: {props.song.SongName}</h1>
                <button>Edit</button>
            </li> : null}
        <Card className="dashboard-card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.song.SongName}</Card.Title>
                <Router className='dashboard-link' >
                    <div className="d-flex justify-content-between">
                        <Button href="/play"><img alt="Play" src={playImg} height='25em' width='25em'></img> Play</Button>
                            <Switch>
                                <Route path='/play'>
                                    <Play></Play>
                                </Route>
                            </Switch>
                        <Button href="/create">Edit</Button>
                        <Switch>
                            <Route path='/create'>
                                <Create></Create>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </Card.Body>
        </Card>
        </>
    );
}

export default DashboardItem;
