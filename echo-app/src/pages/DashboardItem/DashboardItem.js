import React from "react";
import { Button , Card } from 'react-bootstrap'
import playImg from '../../assets/playButton.png'


function DashboardItem(props) {
    return(
        <>
        <Card className="dashboard-card" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.song.SongName}</Card.Title>
                    <div className="d-flex justify-content-between">
                        <Button href="/play"><img alt="Play" src={playImg} height='25em' width='25em'></img> Play</Button>
                        <Button href={'/create'+'/'+"Jonah Marz"+'/'+props.song.ItemID}>Edit</Button>
                    </div>
            </Card.Body>
        </Card>
        </>
    );
}

export default DashboardItem;
