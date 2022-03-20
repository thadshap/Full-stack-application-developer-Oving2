import axios from "axios";
import http from "../http-common";

const CALCULATION_API_BASE_URL = 'http://localhost:8081/api/calculations'


    export default {

    create (data) {
        return axios.post(CALCULATION_API_BASE_URL, { equation: data })
    },

    setEquation(equation, id){
        return http.post("/saveCalculationsToAUser/"+id, {equation:equation});
    },

    getEquations(id){
        return http.get("/registerUser/equations/"+id);
    }
}

