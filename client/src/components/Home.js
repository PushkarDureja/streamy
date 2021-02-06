import React ,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './styles/home.scss'

const Home = ()=>{


const [live_streams,setStreams] = useState([]);

useEffect (()=>{
    fetch("http://35.247.156.160:8000/api/streams")
        .then(data=>data.json())
        .then(res=>{
            let streams = res;
                if (streams['live'] !== undefined) {
                    getStreamsInfo(streams['live']);
                }
        })
        .catch(err=>console.log(err))
},[])

function getStreamsInfo(streams) {
    const list = JSON.stringify(streams);
    fetch(`/api/stream/getstreams?list=${list}`)
        .then(data=>data.json())
        .then(res=>{
            setStreams(res)
        })
}


    let streams = live_streams.map((stream, index) => {
        return (
            <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={index}>
                <span className="live-label">LIVE</span>
                <Link to={'/stream/' + stream.key}>
                    <div className="stream-thumbnail">
                        <img src={'http://localhost:8000/images/' + stream.key + '.png'}/>
                        <span className="username" style = {{color : 'white'}}>                   
                            {stream.email}
                        </span>
                    </div>
                </Link>

                
            </div>
        );
    });
    return (
        <div className="container mt-5">
            <h4>Live Streams</h4>
            <hr className="my-4"/>

            <div className="streams row">
                {streams}
            </div>
        </div>
    )
}
export default Home