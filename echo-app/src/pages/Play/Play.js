import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getToken} from '../../auth/AuthAction'
import FilePlayer from './Fileplayer'

//once rebecca has endpoint for calling midi player add connection
function Play() {
    const [song, setSong] = useState({});
    const params = useParams();
    params["Authorization"] = getToken();

    useEffect(() =>{
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/play';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(xml_data => setSong(xml_data))
        .then(console.log('Song retrieved'))
    },[])
    
    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                    <h1>Play Page</h1>
                    <FilePlayer music={song}/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Play;