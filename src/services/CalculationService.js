import axios from "axios";

const CALCULATION_API_BASE_URL = 'http://localhost:8081/api/calculations'


    export default {

    create (data) {
        return axios.post(CALCULATION_API_BASE_URL, { equation: data })
    }
}

