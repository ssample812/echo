import React, {useEffect,useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { getToken } from '../../auth/AuthAction'
import { useAuth } from '../../auth/AuthState'
import OpenSheetMusicDisplay from '../SheetMusic/OpenSheetMusicDisplay'

function Create() {

    const params = useParams()
    const [song,setSong] = useState({})
    const [noteSelected, setNoteSelected] = useState(0);
    const [restSelected, setRestSelected] = useState(0);
    // variables for add note
    const [noteMeasure, setNoteMeasure] = useState('1')
    const [noteBeat, setNoteBeat] = useState('1')
    const [notePitch, setNotePitch] = useState('C5')
    const [noteLen, setNoteLen] = useState('whole')
    // variables for add rest
    const [restMeasure, setRestMeasure] = useState('1')
    const [restBeat, setRestBeat] = useState('1')
    const [restLen, setRestLen] = useState('whole')
    // variables for title form
    const [title, setTitle] = useState("")
    const [ authState, _ ] = useAuth()
    params["authorization"] = getToken()

    useEffect(() => {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => setSong(data[0]))
        .then(console.log('done'))
    },[])


    /** Set length options based on beat number */
    const lengths = ["whole", "half", "quarter", "8th"]
    const lengthsDict = {"whole":4, "half":2, "quarter":1, "8th":0.5}
    let noteType = lengths;
    let noteOptions = null;
    let restType = lengths;
    let restOptions = null;

    const changeNoteOptionHandler = (event) => {
        setNoteSelected(event.target.value);
    };
    const changeRestOptionHandler = (event) => {
        setRestSelected(event.target.value);
    };

    if (noteSelected == 2 || noteSelected == 3) {
        noteType = lengths.slice(1)
    } else if (noteSelected == 4) {
        noteType = lengths.slice(2)
    }
    if (noteType) {
        noteOptions = noteType.map((el) => <option>{el}</option>);
    }

    if (restSelected == 2 || restSelected == 3) {
        restType = lengths.slice(1)
    } else if (restSelected == 4) {
        restType = lengths.slice(2)
    }
    if (restType) {
        restOptions = restType.map((el) => <option>{el}</option>);
    }

    
    function handleNewTitle(e) {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        const body={"title": title};
        fetch(url, {
            method: 'PUT',
            headers: params,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data[0])
            setSong(data[0])
        })
        e.preventDefault()
    }

    function handleNewNote(e) {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        const position = (parseFloat(noteMeasure)-1) * 4 + (parseFloat(noteBeat)-1)
        const len = lengthsDict[noteLen]
        let body={"note": {"pitch": notePitch, "position": position, "duration": len}};
        if (noteLen == '8th') {
            body={"note": [{"pitch": notePitch, "position": position, "duration": len}, {"pitch": notePitch, "position": position+0.5, "duration": len}]};
        }

        fetch(url, {
            method: 'PUT',
            headers: params,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data[0])
            setSong(data[0])
        })
        e.preventDefault()
    }

    function handleNewRest(e) {
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        const position = (parseFloat(restMeasure)-1) * 4 + (parseFloat(restBeat)-1)
        const len = lengthsDict[restLen]
        const body={"note": {"pitch": "R", "position": position, "duration": len}};
        fetch(url, {
            method: 'PUT',
            headers: params,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data[0])
            setSong(data[0])
        })
        e.preventDefault()
    }

    function clearOnClick(){
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        const body={"note": {"pitch": "R", "position": 0, "duration": 16}};
        fetch(url, {
            method: 'PUT',
            headers: params,
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data[0])
            setSong(data[0])
        })
    }

    function deleteOnClick(){
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/create';
        fetch(url, {
            method: 'DELETE',
            headers: params
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .then(alert("Song Deleted"))
    }

    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                    <h1>{song.SongName}</h1>
                    <OpenSheetMusicDisplay music={song.MusicXml} />
                    <div>
                    <h5>Add a new note:</h5>
                    <Form inline onSubmit= {e => handleNewNote(e)}>
                        <Form.Label className="my-1 mr-2">
                            Measure:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => setNoteMeasure(e.target.value)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                        <Form.Label className="my-1 mr-2">
                            Beat:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => {
                                changeNoteOptionHandler(e)
                                setNoteBeat(e.target.value)}}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                        <Form.Label className="my-1 mr-2">
                            Note:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => setNotePitch(e.target.value)}
                        >
                            <option value='C5'>C5</option>
                            <option value='B4'>B</option>
                            <option value='A4'>A</option>
                            <option value='G4'>G</option>
                            <option value='F4'>F</option>
                            <option value='E4'>E</option>
                            <option value='D4'>D</option>
                            <option value='C4'>C4</option>
                        </Form.Control>
                        <Form.Label className="my-1 mr-2">
                            Length:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => setNoteLen(e.target.value)}
                        >
                            {
                                noteOptions
                            }
                        </Form.Control>
                        <Button type="submit" className="my-1">
                            Submit
                        </Button>
                    </Form>
                    <br></br>
                    <h5>Add a new rest:</h5>
                    <Form inline onSubmit= {e => handleNewRest(e)}>
                        <Form.Label className="my-1 mr-2">
                            Measure:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => setRestMeasure(e.target.value)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                        <Form.Label className="my-1 mr-2">
                            Beat:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => {
                                changeRestOptionHandler(e)
                                setRestBeat(e.target.value)
                            }}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                        <Form.Label className="my-1 mr-2">
                            Length:
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            custom
                            onChange={e => setRestLen(e.target.value)}
                        >
                            {
                                restOptions
                            }
                        </Form.Control>
                        <Button type="submit" className="my-1">
                            Submit
                        </Button>
                    </Form>
                    <br></br>
                    <h5>Change the title:</h5>
                    <Form inline onSubmit= {e => handleNewTitle(e)}>
                        <Form.Label className="my-1 mr-2">
                            Title:
                        </Form.Label>
                        <Form.Control
                            className="mb-2 mr-sm-2"
                            placeholder={song.SongName}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Button type="submit" className="mb-2">
                            Submit
                        </Button>
                    </Form>
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-between">
                        <Button href='/play'>Play</Button>
                        <div>
                            <Button onClick = {() => clearOnClick()}>Clear</Button>
                            <span>  </span>
                            <Button onClick = {() => deleteOnClick()}>Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Create;