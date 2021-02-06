import React ,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert'
import setHeaders from '../utils/setheader';

import EditModal from './editstream'


const MyStream = (props)=>{

    const [myStreams,setStreams] = useState([]);
    const [modalState,setModalState] = useState(false);
    const [currStream,setCurrStream] = useState({});


    useEffect(()=>{
        console.log(props);
        fetch(`/api/stream/getstreams/${props.user.email}`,{
            headers : new Headers({
                'Accept' : 'application/json' ,
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then(data=>{
                setStreams(data)
            })
        
    },[])

     function deleteStream(key){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this stream!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {

            const res = await fetch(`/api/stream/delete/${key}`,{
                            method : 'DELETE',
                            headers : setHeaders({
                                'Accept' : 'application/json' ,
                                'Content-Type': 'application/json'
                            })
                        })
                const deleted = await res.json()
                console.log(deleted)
            if(deleted){
                    swal("Stream Deleted", {
                        icon: "success",
                    });
                    const newStreams = myStreams.filter(st=>st.key!==key);
                    setStreams(newStreams)
                }
                else {
                    swal("Deletion failed");
                  }
            } else {
              swal("Deletion failed");
            }
          });
    }


    function updateStream(idx){
        setModalState(true);
        setCurrStream({
            idx : idx,
            title : myStreams[idx].title,
            description : myStreams[idx].description,
            key : myStreams[idx].key
        })
    }
    function closeModal(){
        setModalState(false)
    }
    async function handleUpdate(newTitle,newDes){
        const res = await fetch(`/api/stream/update/${currStream.key}`,{
            method : 'PUT',
            headers : setHeaders({
                'Accept' : 'application/json' ,
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({title : newTitle,description : newDes})
        })  
        const updated = await res.json();
            if(updated){
                const newStreams = [...myStreams];
                const idx = currStream.idx;
                newStreams[idx].title = newTitle;
                newStreams[idx].description = newDes;
                setStreams(newStreams);
                setModalState(false);
                setCurrStream({});
                swal("Stream Details Updated", {
                    icon: "success",
                });
            }
            else {
                swal("Updation failed");
            }
    }

    const streams = myStreams.map((st,index)=>{
        return (

        
        <div className="list-group-item list-group-item-action flex-column align-items-start " onClick = {(e)=>{
            swal('Stream Key',st.key)
        }}>
            <div className = 'd-flex'>
                <div className = 'd-flex align-items-center'>
                <img src = {'http://localhost:8000/images/6TZZj5UDW1cShhUnrJ71b.png'} style = {{width:'10vw',height:'10vh',margin:'10px'}}></img>
                </div>
                <div style = {{width:'100%',padding:'10px'}}>
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{st.title}</h5>
                        <small>3 days ago</small>
                        </div>
                        <p className="mb-1" style = {{textAlign:'justify'}} >{st.description}</p>
                        <div className = "d-flex w-100 justify-content-between">
                        <small>Not Live</small>    
                        <div>
                            <button className  = 'btn btn-dark' onClick = {(e)=>{
                                e.stopPropagation();
                                updateStream(index)
                            }}>Edit</button>
                            <button className  = 'btn btn-dark mx-1'onClick = {(e)=>{
                                e.stopPropagation()
                                deleteStream(st.key)
                            }}>Delete</button>

                        </div>
                        </div>
                </div>
            </div>
           
        </div>
        )
    })
    return(
        <div className="container mt-5">
            {modalState ? <EditModal showModal = {modalState} stream = {currStream} closeModal = {closeModal} updateStream = {handleUpdate}/> : null}
            <h4 className = 'text-center'>My Streams</h4>
            <hr className="my-4"/>
                <div class="list-group">
                    {streams}
                </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return  {
        user : state.user
    }
}

export default connect(mapStateToProps)(MyStream);