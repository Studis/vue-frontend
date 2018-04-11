import axios from 'axios'


let rest = {
    setAuthorizationToken: function(data) {
        let token = (data) ? btoa(data.username + ':' + data.password) : false
        if(token) {
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.defaults.headers.common['Authorization'] = `Basic ${token}`
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['authorization']
        }
        return token
    },
    getToken () {
        return localStorage.getItem('token')
    }
}
export default rest