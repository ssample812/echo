import React, {useState,useEffect} from 'react'
import { CardColumns } from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from 'react-router-dom'
import DashboardItem from '../DashboardItem/DashboardItem'
import Play from '../Play/Play'


//For now this is just going to have dummy data in it because I cant test rendering with Lambda on local

function Dashboard() {
    const [songs,setSongs] = useState([]);
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs';
        const header = {"userid": "Jonah Marz"};
        fetch(url, {
            method: 'GET',
            headers: header
        })
        .then(resp => resp.json())
        .then(data => setSongs(data))
        .then(setLoading(1))
        .then(console.log('done'))
    },[loading])
    //Need to make the delete button work now but the overall dashboard is done
    //add create button to dashboard page
    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                    <h1>Dashboard</h1>
                    <CardColumns>
                        {songs.map((song, index) => {
                            return(
                                <DashboardItem key = {index} song = {song}></DashboardItem>
                            )
                        })}
                    </CardColumns>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
