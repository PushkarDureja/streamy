import {getStreamsInfo} from '../utils/getstreaminfo'

export const setStreams = (streams)=>{
    return {
        type :  "SET_STREAMS",
        payload : streams
    }
}

export const setStreamStatusTrue = ()=>{
    return {
        type : "S_STATUS_T"
    }
}
export const setStreamStatusFalse = ()=>{
    return {
        type : "S_STATUS_F"
    }
}


export const fetchStreams = ()=>{
    return dispatch => {
    fetch("http://35.247.156.160:8000/api/streams")
        .then(data=>data.json())
        .then(async(res)=>{
            console.log("fetching")
            let streams = res;
                if (streams['live'] !== undefined) {
                    const info = await getStreamsInfo(streams['live']);
                    dispatch(setStreamStatusTrue());
                    dispatch(setStreams(info))
                }
                else {
                    dispatch(setStreams([]))
                    dispatch(setStreamStatusFalse())
                }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setStreamStatusFalse())
        })
    }
}