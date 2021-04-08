import React, {useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from 'react-router-dom'
import Create from '../Create/Create'
import DashboardItem from '../DashboardItem/DashboardItem'
import Play from '../Play/Play'

//For now this is just going to have dummy data in it because I cant test rendering with Lambda on local

function Dashboard() {
    const [songs,setSongs] = useState([{song_title:"song"}]);


    async function getSongs(){
        // const songs = [{
        //     song_title: "song1"
        // },
        // {
        //     song_title: "song2"
        // }];
        const url='https://q3yhyoo56l.execute-api.us-east-1.amazonaws.com/default/pull_song';
        const body = {"user_id": "Jonah Marz"}
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        });
        const resp = await response.json();
        setSongs(resp.body)
    
    
    }

    useEffect(() => {
        getSongs();
    },[songs])
    //Need to make this work with the async
    return(
        <>
            <div>
                <h1>Fancy Dashboard Page</h1>
                <Router>
                    <a href='/create'>Create</a>
                    <Switch>
                        <Route path='/create'>
                            <Create></Create>
                        </Route>
                    </Switch>
                </Router>
                <ul>
                    {songs.map((song) => {
                        <DashboardItem song = {song}></DashboardItem>;
                    })}
                </ul>
            </div>
        </>
    );
}



export default Dashboard;