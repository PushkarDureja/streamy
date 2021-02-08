import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {nanoid} from 'nanoid'
import swal from 'sweetalert'
import setHeaders from '../utils/setheader'
import './styles/form.css'


const CreateStream = (props)=>{

    const [title,setTitle] =  useState('');
    const [description,setDescription] = useState('');
    const [streamKey,setKey] = useState();
    
    useEffect(()=>{
        setKey(nanoid);
    },[])

    function handleCreateStream (e){
        e.preventDefault()
        console.log(props.user.email,title,description,streamKey)
        fetch(`/api/stream/createstream/${props.user.email}`,{
            method : 'POST',
            headers : setHeaders({
                'Accept' : 'application/json' ,
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({
                
                title : title,
                description : description,
                key : streamKey,
                date : new Date().getTime()
            })
        
        
        }).then(()=>{
            swal(`${streamKey}`, "Add Stream key in streaming software", "success")
                .then(()=>props.history.push('/'))
        })
    }

    return (
        <div className="container outerbox">
        <div className="text-center">
          <h3>New Stream</h3>
        </div>
        <form className="form-box" onSubmit={handleCreateStream} id="1">
          <div className="mb-3">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              required
              maxLength="400"
              placeholder="Maximum 400 characters"
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg submit-btn"
            form="1"
          >
            Save & Generate Key
          </button>
        </form>

        <div className="container mt-5 ">
          <div style={{ textAlign: "center" }}>
            <h5>How to Stream</h5>
          </div>

          <hr className="my-4" />

          <div className="col-12">
            <div className="row">
              <p>
                You can use <a href="https://obsproject.com/">OBS</a> or
                <a href="https://www.xsplit.com/">XSplit</a> to Live stream. If
                you're using OBS, go to Settings Stream and select Custom from
                service dropdown. Enter <b>rtmp://127.0.0.1:1935/live</b> in
                server input field. Also, add your stream key. Click apply to
                save.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        user : state.user.user
    }
}
export default connect(mapStateToProps)(CreateStream)