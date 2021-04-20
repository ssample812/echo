import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {getToken} from '../../auth/AuthAction'
import {useParams} from 'react-router-dom'

function FilePlayer() {
    
    var MIDIPlayer = require('midiplayer');
    var MIDIFile = require('midifile');

    const [statevar, setStateVar] = useState({});
    const params = useParams();
    params["Authorization"] = getToken();
    useEffect(() =>{
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/play';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => setStateVar(data[0]))
    
        if(statevar != {}) {
            return null;
        }
    },[])


    // may need to add some adjustments to have an actual pause
    const start = () => {
        navigator.requestMIDIAccess().then(function(midiAccess) {
            var midiPlayer = new MIDIPlayer({
                'output': Array.from(midiAccess.outputs)[0]
            });
            var midiFile = new MIDIFile(statevar);
            midiPlayer.load(midiFile);
            midiPlayer.play(function playCallback() {
                midiPlayer.play(playCallback);
            });
        })
    }
    const stop = () => {
    }

    return(
        <>
            <div>
                <Button onClick={start}>Play</Button>
                <Button onClick={stop}>Pause</Button>
            </div>
        </>
    );
}

export default FilePlayer;
