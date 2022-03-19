import http from "../http-common";

class LogInService{
    getProfile(data){
        return http.get("/users", { username: data });
    }
    getProfiles() {
        return http.get('/users')
    }
}
export default new LogInService();