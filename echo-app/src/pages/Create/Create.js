import React, {useEffect,useState} from 'react'
import { Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import OpenSheetMusicDisplay from '../SheetMusic/OpenSheetMusicDisplay'

function Create() {

    const params = useParams()
    const [song,setSong] = useState({})

    function deleteOnClick(){
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        fetch(url, {
            method: 'DELETE',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .then(alert("Song Deleted"))    
    }
        
    useEffect(() => {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => setSong(data[0]))
        .then(console.log('done'))
    },[])

    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                    <h1>{song.SongName}</h1>
                    <OpenSheetMusicDisplay music={song.MusicXml} />
                    <div className="d-flex justify-content-between">
                        <Button href='/play'>Play</Button>
                        <Button onClick = {() => deleteOnClick(song.ItemID)}>Delete</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Create;