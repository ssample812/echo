import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {getToken} from '../../auth/AuthAction'
import {useParams} from 'react-router-dom'

function FilePlayer() {
    
    var lame = require('lame');
    var musicXmlToPcm = require('musicxml-to-pcm');

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
        .then(xml_data => setStateVar(xml_data))
        if(statevar != {}) {
            return null;
        }
    },[])

    console.log(statevar);
    var stream = musicXmlToPcm.newStream(statevar, 16, 44100)

    var encoder = new lame.Encoder({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100,
        bitRate: 128,
        outputSampleRate: 22050,
        mode: lame.STEREO
    })
    
    let audio = new Audio(stream.pipe(encoder));

    const start = () => {
        audio.play()
    }
    const stop = () => {
        audio.pause()
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
