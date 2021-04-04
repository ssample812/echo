function DashboardItem(props) {
    console.log(props.song.song_title)
    return(
        <>
            <div>
                <h1>Song Title: {props.song.song_title}</h1>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </>
    );
}

export default DashboardItem;