import axios from 'axios'


let rest = {
    setAuthorizationToken: function(data) {
        let token = (data) ? btoa(data.username + ':' + data.password) : false
        if(token) {
            localStorage.setItem('token', token)
            axios.defaults.headers.common['authorization'] = `Basic ${token}`;
        } else {
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['authorization'];
        }
        return token
    },
    getToken () {
        return localStorage.getItem('token') || false
    }
}
export default rest