export default function setHeaders(headers) {
    if(localStorage.getItem("token")) {
        return {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    } else {
        return headers;
    }
}