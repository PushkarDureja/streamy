import React, {useState} from 'react'
import {connect} from 'react-redux'
import {signup} from '../actions/auth'
import fb from '../config/firebase'
import {Link} from 'react-router-dom'

const SignUp = ({auth})=>{
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');


function handleSignUp(e){
    e.preventDefault();
    fb.auth().createUserWithEmailAndPassword(email,pass)
        .then(user=>{
            auth(user);
        })
        .catch(err=>{
            console.log(err);
        })
    
}

    return(
    <div className="container outerbox">
      <div className="text-center">
        <h3>SignUp to Streamy</h3>
      </div>
      <form id="1" onSubmit={handleSignUp} className="form-box">
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input-background form-control"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            className="form-control input-background"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark submit-btn"
          form="1"
        >
          SignUp
        </button>
      </form>
      <p className="asker-div">
        Already on Streamy? <Link to="/login">Login</Link>
      </p>
    </div>
    )

   
}

const mapStateToProps = (state)=>{
    return {
        user : state.user
    }
}
export default connect(mapStateToProps,{
    auth : signup
})(SignUp)