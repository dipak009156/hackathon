import axios from 'axios'

const Api = axios.create({
    withCredentials : true,
    baseURL : '/api'
})

export default Api