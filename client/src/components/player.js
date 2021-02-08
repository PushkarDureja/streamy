import React, { Component } from "react";
import { ReactFlvPlayer } from "react-flv-player";
import { timeDifference } from "../utils/timestamp";

class Player extends Component {
   
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }} >
        <ReactFlvPlayer
          url={`http://35.247.156.160:8000/live/${this.props.stream.key}.flv`}
          isLive={true}
          height="70vh"
          width="100vw"
        />
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "x-large", fontWeight: "bolder" }}>{this.props.stream.title}</div>
          <div>Started {timeDifference(new Date().getTime(),new Date(this.props.stream.started).getTime())}</div>
        </div>

        <div
          style={{ padding: "8px 20px", fontSize: "smaller"}}
        >
          {this.props.stream.description}
         
        </div>
      </div>
    );
  }
}

export default Player;