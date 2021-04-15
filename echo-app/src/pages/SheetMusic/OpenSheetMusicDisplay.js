import React, { useEffect, useState } from 'react';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';
import { Spinner } from 'react-bootstrap'

function OpenSheetMusicDisplay(props) {
    const [musicXml,setMusic] = useState("")
    const options = {
      drawTitle: false,
    }
    var divRef = React.createRef();
    var osmd = new OSMD(divRef.current, options);


    function setupOsmd() {
      osmd.load(musicXml).then(() => render());

    }

    useEffect(() => {
      setMusic(props.music)
));
    },[])

    // function resize() {
    //   this.forceUpdate();
    // }
  
    // function componentWillUnmount() {
    //   window.removeEventListener('resize', this.resize)
    // }
  
    // // Called after render
    // componentDidMount() {
    //   this.setupOsmd();
    // }
  
    function render() {
      return (<div ref={divRef} />);
    }

    // renderSpinner() {
    //   return (<Spinner animation="border" role="status">
    //   <span className="sr-only">Loading...</span>
    // </Spinner>);
    // }
  }

  export default OpenSheetMusicDisplay;
