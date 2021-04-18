import React from 'react'
import { Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'

function FilePlayer() {
    
    var MIDIPlayer = require('midiplayer');
    var MIDIFile = require('midifile');

    const params = useParams();

    navigator.requestMIDIAccess().then(function(midiAccess) {
        var midiPlayer = new MIDIPlayer({
            'output': midiAccess.outputs()[0]
        });
        // call stuff to get the musicxml as midi
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/play';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    })
        /*
        var midiFile = new MIDIFile();

        midiPlayer.load(midiFile);

        // may need to add some adjustments to have an actual pause
        const start = () => {
            midiPlayer.play()
        }
        const stop = () => {
            midiPlayer.pause()
        }
        return(
            <>
                <div>
                    <Button onClick={start}>Play</Button>
                    <Button onClick={stop}>Pause</Button>
                </div>
            </>
        );
    })*/
    
    let audio = new Audio("https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3")

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
