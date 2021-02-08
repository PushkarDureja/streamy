const initialState = {
    stream : [],
    steamFound : true
}


export const streamReducer = (state = initialState,action)=>{
    if(action.type === "SET_STREAMS"){
        return {
        
            stream : action.payload
        }
    }
    if(action.type === "S_STATUS_T"){
        return {
            ...state,
            streamFound : true
        }
    }
    if(action.type === "S_STATUS_F"){
        return {
            ...state,
            streamFound : false
        }
    }

    return state

}