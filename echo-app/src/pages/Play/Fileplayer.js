import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class FilePlayer extends Component {

    constructor(props) {
        super(props);
        this.audio = undefined;
    }

    setupFilePlayer() {
        var lame = require('lame');
        var musicXmlToPcm = require('musicxml-to-pcm');
        console.log(this.props.music);
        if(this.props.music) {
            var stream = musicXmlToPcm.newStream(this.props.music, 16, 44100);
            var encoder = new lame.Encoder({
                channels: 2,
                bitDepth: 16,
                sampleRate: 44100,
                bitRate: 128,
                outputSampleRate: 22050,
                mode: lame.STEREO
            })
            
            this.audio = new Audio(stream.pipe(encoder));
        }
    }
    /*
    var lame = require('lame');
    var musicXmlToPcm = require('musicxml-to-pcm');

    const [statevar, setStateVar] = useState({});
    const params = useParams();
    params["Authorization"] = getToken();

    useEffect(() =>{
        const url='https://56rrn4nhgh.execute-api.us-east-1.amazonaws.com/songs/play';
        fetch(url, {
            method: 'GET',
            headers: params
        })
        .then(resp => resp.json())
        .then(xml_data => setStateVar(xml_data))
        if(statevar == {}) {
            return null;
        }
    },[])

    console.log(statevar);
    var xml = fs.readFileSync("sample.xml");
    var stream = musicXmlToPcm.newStream(xml, 16, 44100)

    var encoder = new lame.Encoder({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100,
        bitRate: 128,
        outputSampleRate: 22050,
        mode: lame.STEREO
    })
    
    let audio = new Audio(stream.pipe(encoder));

    const start = () => {
        audio.play()
    }
    const stop = () => {
        audio.pause()
    }
*/
    componentDidMount() {
        this.setupFilePlayer();
    }

    render() {
        return(
            <>
                <div>
                    <Button onClick={this.audio.play()}>Play</Button>
                    <Button onClick={this.audio.pause()}>Pause</Button>
                </div>
            </>
        );
    }
}

export default FilePlayer;
