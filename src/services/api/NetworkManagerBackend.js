import axios from 'axios';

export default{
    
    getAll(url){
        return axios.get("http://localhost:8090/api"+url)
        .then(response => {
            return response.data
        })
    }
}