import axios from "axios";

class ApiClient {

    constructor(remoteHostUrl) {

        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "life_tracker_token";
    }

    //utility method...
    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;
        const headers = {
            "Content-Type": "application/json"
        }
        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers }); //passing config methods to axios
            return { data: res.data, error: null };
        } catch (error) {
            const errorResponse = error?.response?.data?.error?.message;
            return { data: null, error: errorResponse || String(error) };
        }
    }

    //Authentication
    async login(credentials) {
        return await this.request({ endpoint: "/auth/login", method: "POST", data: credentials })
    }

    async register(credentials) {
        return await this.request({ endpoint: "/auth/login", method: "POST", data: credentials })
    }


    //Main tabs

    async listMaintabs() {
        return await this.request({ endpoint: "maintabs", method: "GET" });
    }

    async createMaintab(details) { 
        return await this.request({ endpoint: "maintabs/create/", method: "POST", data: details });
    }

    async getMaintab() {
        return await this.request({ endpoint: "maintabs/:maintabId", method: "GET" });
    }

    async deleteMaintab() { 
        return await this.request({ endpoint: "maintabs/:maintabId", method: "DELETE" });
    } 
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001");
