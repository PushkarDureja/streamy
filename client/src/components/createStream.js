import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {generatePath, Redirect} from 'react-router-dom'
import {nanoid} from 'nanoid'
import { setUser } from '../actions/auth'

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
        fetch(`/api/createstream/${props.user.email}`,{
            method : 'POST',
            headers : new Headers ({
                'Accept' : 'application/json' ,
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({
                
                title : title,
                description : description,
                key : streamKey,
            })
        
        
        })
    }

    function generateKey(){
        setKey(nanoid());
    }


    if(props.user === null)
        return <Redirect to = '/login' exact />
    return (
        <React.Fragment>
        <div className="container mt-5">
            <h4 className = 'text-center'>New Stream</h4>
            <hr className="my-4"/>

            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6" style = {{margin: "auto"}}>
                <div className = 'row'>
                <form style = {{maxWidth:'30vw',margin:'2% auto', padding:'2%',minWidth:'200px'}} onSubmit = {handleCreateStream} id = 'f1'>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input  class="form-control" required id="exampleFormControlInput1" placeholder="Enter Title" value = {title} onChange = {(e)=>setTitle(e.target.value)} />
                        </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" required placeholder = "Enter Description" id="exampleFormControlTextarea1" rows="3" value = {description} onChange = {(e)=>setDescription(e.target.value)}></textarea>
                    </div>
                    
                </form>
                </div>
                <div className="row">
                    <h5 className = 'col-6 col-xs-12 text-center py-1'>{streamKey}</h5>
                    <div className = 'btn btn-dark col-4' type = "button" onClick = {generateKey}>New Key</div>
                </div>

                <div className = 'row my-4 d-flex justify-content-center'>
                    <button className = 'btn btn-dark col-4' form = "f1">Submit</button>
                </div>
                
            </div>
        </div>

        <div className="container mt-5">
            <h4>How to Stream</h4>
            <hr className="my-4"/>

            <div className="col-12">
                <div className="row">
                    <p>
                        You can use <a target="_blank" href="https://obsproject.com/">OBS</a> or
                        <a target="_blank" href="https://www.xsplit.com/">XSplit</a> to Live stream. If you're
                        using OBS, go to Settings Stream and select Custom from service dropdown.
                        Enter <b>rtmp://127.0.0.1:1935/live</b> in server input field. Also, add your stream key.
                        Click apply to save.
                    </p>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}

const mapStateToProps = (state)=>{
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(CreateStream)