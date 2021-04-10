function DashboardItem(props) {
//Make the delete button actually work now
    return(
        <>
            <li>
                <h1>Song Title: {props.song.SongName}</h1>
                <button>Edit</button>
                <button>Delete</button>
            </li>
        </>
    );
}

export default DashboardItem;