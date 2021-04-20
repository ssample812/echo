import React from 'react'
import FilePlayer from './Fileplayer'


//once rebecca has endpoint for calling midi player add connection
function Play() {
    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                    <h1>Play Page</h1>
                    <FilePlayer></FilePlayer>
                </div>
            </div>
        </div>
        </>
    );
}

export default Play;