import React from 'react'

const NotFound = ()=>{
    return(
        <div style = {{position: 'absolute',top:'50%',left :'50%', transform: "translate(-50%,-50%)"}}>
            <h1 style={{display: "inline-block", borderRight: "1px solid rgba(0, 0, 0, 0.3)", margin: "0px 20px 0px 0px", padding: "10px 23px 10px 0px", fontSize: "24px", fontWeight: "500", verticaAlign: "top"}}>
                404
            </h1>
            <div style={{display: "inline-block", textAlign: "left", lineHeight: "49px" , height: "49px", verticalAlign: "middle"}}>
                <h2 style={{fontSize: "14px", fontWeight: "normal", lineHeight: "inherit", margin: "0px", padding: "0px"}}>This page could not be found.</h2>
            </div>
        </div>
    )
}
export default NotFound