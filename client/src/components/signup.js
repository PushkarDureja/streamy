import React, {useState,useEffect} from 'react'
import fb from '../config/firebase'
import {connect} from 'react-redux'
import {setUser,clearUser} from '../actions/auth'

const SignUp = (props)=>{
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    useEffect(()=>{
        const unsubscribe = fb.auth().onAuthStateChanged(user=>{
            if(user){
                props.dispatch(setUser(user));
            }
            else
                props.dispatch(clearUser())
        })
        return ()=>unsubscribe()
    },[])

function handleSignUp(e){
    e.preventDefault();
    fb.auth().createUserWithEmailAndPassword(email,pass)
        .then(user=>{
            console.log(user.user.email)
            fetch('/api/createuser',{
                method : 'POST',
                headers: new Headers({
                    'Accept' : 'application/json' ,
                    'Content-Type': 'application/json'
                }),
                body : JSON.stringify({email :user.user.email})
            })
        })
        .catch(err=>console.log(err))

    
}

    return(
        <form style = {{maxWidth:'30vw',margin:'2% auto', padding:'2%',minWidth:'200px'}}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {email}  onChange = {(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value = {pass} onChange = {(e)=>setPass(e.target.value)}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button className="btn btn-primary" onClick = {handleSignUp}>Submit</button>
    </form>
    )

   
}

const mapStateToProps = (state)=>{
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(SignUp)