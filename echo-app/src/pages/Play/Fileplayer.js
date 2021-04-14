import React from 'react'
import { Button } from 'react-bootstrap'

function FilePlayer() {
    
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
