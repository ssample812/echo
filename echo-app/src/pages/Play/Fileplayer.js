import React from 'react'
import { Button } from 'react-bootstrap'

function FilePlayer() {
    
    var MIDIPlayer = require('midiplayer');
    var MIDIFile = require('midifile');

    navigator.requestMIDIAccess().then(function(midiAccess) {
        var midiPlayer = new MIDIPlayer({
            'output': midiAccess.outputs()[0]
        });
        // call stuff to get the musicxml as midi
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
    })
    /*
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
    );*/
}

export default FilePlayer;
