
import fb from '../config/firebase'

export const setUser = (user)=>{
    return {
        type : "SET_USER",
        payload : user
    }
}

export const clearUser = ()=>{
    return {
        type : "CLEAR_USER",
    }
}


export const login = (user) => {
    return async (dispatch) => {
      fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ user: user.user }),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          console.log("dispatching");
          dispatch(setUser(user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  export const signup = (user) => {
    return async (dispatch) => {
      fetch("/api/user/createuser", {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(user.user),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          dispatch(setUser(user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


export const logout = ()=>{
    return dispatch=>{
    fb.auth().signOut()
        .then(()=>{
            localStorage.removeItem("token")
            dispatch(clearUser())
        })
    }
}
