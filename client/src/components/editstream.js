import React, {useState} from 'react'
import { Modal, Button} from 'react-bootstrap';

const EditModal = ({closeModal,showModal,stream,updateStream})=>{
    
    const [title,setTitle] = useState(stream.title);
    const [des,setDes] = useState(stream.description);

    
    return(
        <Modal
        size="lg"
        show = {showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header   >
          <Modal.Title id="contained-modal-title-vcenter" className= 'text-center'>
            Edit Stream Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id = "edit" onSubmit = {
            (e)=>{e.preventDefault();
            updateStream(title,des)
        }}>
        <div class="modal-body">
          <div class="form-group">
            <label for="email1">Title</label>
            <input type="text" class="form-control" id="email1" aria-describedby="emailHelp" value = {title} placeholder="Enter new title" onChange = {(e)=>setTitle(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="password1">Description</label>
            <textarea className="form-control" required placeholder = "Enter new description" id="exampleFormControlTextarea1" rows="3" value = {des} onChange = {(e)=>setDes(e.target.value)}></textarea>
          </div>
        </div>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {closeModal}>Close</Button>
          <Button type = "submit" form = "edit" >Update</Button>
        </Modal.Footer>
      </Modal>
    )
}
export default EditModal