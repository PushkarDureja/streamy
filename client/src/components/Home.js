import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './styles/home.scss'

const Home = ({stream})=>{





    let streams = stream.map((stream, index) => {
        return (
            <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={index}>
                <span className="live-label">LIVE</span>
                <Link to={'/stream/' + stream.key}>
                    <div className="stream-thumbnail">
                        <img src={'http://localhost:8000/images/' + stream.key + '.png'} onError = {(e)=>{
                            e.target.onerror = null;
                            e.target.src = "/no_image.png";
                            e.target.style = "height : 30vh"
                            }}/>
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
const mapStateToProps = (state)=>{
    return {
        stream : state.stream.stream
    }
}

export default connect(mapStateToProps)(Home)