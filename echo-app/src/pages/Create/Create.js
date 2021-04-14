import React from 'react'
import { Button } from 'react-bootstrap'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Play from '../Play/Play'

function Create() {

    const [hidden,setHidden] = useState(true);
    function deleteOnClick(item_id){
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        const header = {
            "user_id": "Jonah Marz",
            "item_id": item_id
        }
        fetch(url, {
            method: 'DELETE',
            headers: header
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .then(alert("Song Deleted"))
        .then(setHidden(false));
    
    }
    
    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                <h1>Create Page</h1>
                    <Router>
                        <Button href='/play'>Play</Button>
                        <Button onClick = {() => deleteOnClick(props.song.item_id)}>Delete</Button>
                        <Switch>
                            <Route path='/play'>
                                <Play></Play>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
        </>
    );
}

export default Create;