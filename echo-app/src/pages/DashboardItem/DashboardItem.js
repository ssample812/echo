import React, {useState} from "react";

function DashboardItem(props) {
//Make the delete button actually work now
const [hidden,setHidden] = useState(true);
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
    .then(setHidden(false));
}

    return(
        <>
            {hidden ? <li>
                <h1>Song Title: {props.song.SongName}</h1>
                <button>Edit</button>
                <button onClick = {() => deleteOnClick(props.song.item_id)}>Delete</button>
            </li> : null}
        </>
    );
}

export default DashboardItem;