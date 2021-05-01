import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import FilePlayer from './Fileplayer'

function Play() {
    const params = useParams();
    const [song, setSong] = useState({});

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