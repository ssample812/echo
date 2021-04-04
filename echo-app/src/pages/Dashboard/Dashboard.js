import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from 'react-router-dom'
import Create from '../Create/Create'
import DashboardItem from '../DashboardItem/DashboardItem'
import Play from '../Play/Play'

//For now this is just going to have dummy data in it because I cant test rendering with Lambda on local

function Dashboard() {
    const songs = getSongs();
    console.log(songs);
    const songList= songs.map(function(song){
        return <DashboardItem song = {song}></DashboardItem>
    });
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
                    {songList}
                </ul>
            </div>
        </>
    );
}

function getSongs(){
    const songs = [{
        song_title: "song1"
    },
    {
        song_title: "song2"
    }];
    return songs;
}

export default Dashboard;