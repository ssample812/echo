import React, {useEffect,useState} from 'react'
import { Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'

function Create() {

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
    }

    const params = useParams()
    const [song,setSong] = useState({})
        
    useEffect(() => {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/play';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => setSong(data[0]))
        .then(console.log('done'))
        .then(console.log(song))
    },[])

    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                <h1>{song.SongName}</h1>
                    <Button href='/play'>Play</Button>
                    <Button onClick = {() => deleteOnClick(song.ItemID)}>Delete</Button>]
                </div>
            </div>
        </div>
        </>
    );
}

export default Create;