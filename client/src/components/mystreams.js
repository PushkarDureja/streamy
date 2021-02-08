import React ,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert'
import setHeaders from '../utils/setheader';
import {timeDifference} from '../utils/timestamp'
import EditModal from './editstream'
import {ShowAndHide} from '../utils/conditionalshow'


const MyStream = (props)=>{
    // console.log(props.stream)
    const [myStreams,setStreams] = useState([]);
    const [modalState,setModalState] = useState(false);
    const [currStream,setCurrStream] = useState({});


    useEffect(()=>{
        // console.log(props);
        fetch(`/api/stream/getstreams/${props.user.email}`,{
            headers : new Headers({
                'Accept' : 'application/json' ,
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then(data=>{
                let finalStreams = [];
               data.map(st=>{
                    const s = props.stream.find(ps=>ps.key === st.key)
                    // console.log(s)
                    if(s!==undefined){
                        finalStreams = [...finalStreams,{...st,live : true}]
                    }
                    else 
                        finalStreams = [...finalStreams,{...st,live : false}]
                })
                setStreams(finalStreams)
            })
        
    },[props.stream])

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
            
        }} style = {{cursor : "pointer"}}  >
            <div className = 'd-flex'>
                <div className = 'd-flex align-items-center'>
                <img src = {'http://localhost:8000/images/' + st.key + '.png'} style = {{width:'10vw',height:'15vh',margin:'10px'}}
                    onError = {(e)=>{
                        e.target.onerror = null;
                        e.target.src = "/no_image.png"
                    }}
                    className="d-none d-md-block d-lg-block d-xl-block"
                ></img>
                </div>
                <div style = {{width:'100%',padding:'10px'}}>
                        <div className="d-flex w-100 justify-content-between">
                        <div className="mb-1 fs-2" style = {{maxWidth : '30vw',wordWrap:'break-word'}}>{st.title}</div>
                        <small>Created {timeDifference(new Date().getTime(),new Date(st.date).getTime())}</small>
                        </div>
                        <p className="mb-1" style={{ textAlign: "justify" }}>
                            {st.description.length > 160 ? (
                                <p>
                                {st.description.substring(0, 160)}
                                <span style={{ display: "none" }} id={`${index}more`}>
                                    {st.description.substring(160)}
                                </span>{" "}    
                                    <span
                                    onClick={(e) => ShowAndHide(e, index)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1px solid black",
                                    }}
                                    >
                                    <b>more/less</b>
                                    </span>
                                </p>
                            ) : (
                                st.description
                            )}
                            </p>
                        <div className = "d-flex w-100 justify-content-between">
                        {st.live ? (
                        <small style = {{backgroundColor: "red",color: "white",padding: "1px 5px",height : '20px'}}>LIVE</small>)
                        :
                        (
                            <small>Not Live</small>
                        )
                    }  
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
        user : state.user.user,
        stream  : state.stream.stream
    }
}

export default connect(mapStateToProps)(MyStream);