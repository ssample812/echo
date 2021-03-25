import React from 'react'

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
                <button onClick={start}>Play</button>
                <button onClick={stop}>Pause</button>
            </div>
        </>
    );
}

export default FilePlayer;
