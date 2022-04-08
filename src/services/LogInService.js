import http from "../http-common";
import https from 'https'

class LogInService{
    getProfile(data){
        return http.get("/users", { username: data });
    }
    getProfiles() {
        return http.get('/users')
    };
    agent = new https.Agent({
        rejectUnauthorized: false
    });

    doLogin (loginRequest) {
        return http.post(`http://localhost:9090/login`, loginRequest, {httpsAgent: this.agent}).then(resonse => {
            return resonse.data;
        });
    }
}
export default new LogInService();