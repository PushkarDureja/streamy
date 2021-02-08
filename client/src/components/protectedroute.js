import React from 'react'
import {connect} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

const ProtectedRoute = ({
    component : Component,
    user,
    ...rest
        }) => {
            console.log(user)
            return (
            <Route
                {...rest}
                render = {(props) => 
                    user ? (
                        <Component {...props}/>
                    ) : 
                    (
                        <Redirect to  = '/login'/>
                    )
                }
            
            />
            )
}

const mapStateToProps = (state)=>{
    return {
        user : state.user.user
    }
}

export default connect(mapStateToProps)(ProtectedRoute)