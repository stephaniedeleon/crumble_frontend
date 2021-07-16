import axios from "axios";

class ApiClient {

    constructor(remoteHostUrl) {

        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "token";
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

    //Token

    setToken (token) {
        this.token = token
        localStorage.setItem(this.tokenName, this.token)
    }

    async fetchUserFromToken () {
        return await this.request({ endpoint: "auth/me/", method: "GET" })
    }


    //Authentication
    async login(credentials) {
        return await this.request({ endpoint: "auth/login/", method: "POST", data: credentials })
    }

    async register(credentials) {
        return await this.request({ endpoint: "auth/register/", method: "POST", data: credentials })
    }

    async logout() {
        this.token = null;
        localStorage.setItem(this.tokenName, "")
    }


    //Main tabs

    async listMaintabs() {
        return await this.request({ endpoint: "maintabs", method: "GET" });
    }

    async createMaintab(details) { 
        return await this.request({ endpoint: "maintabs/create/", method: "POST", data: details });
    }

    async getMaintab(maintabId) {
        return await this.request({ endpoint: "maintabs/"+maintabId, method: "GET" });
    }

    async deleteMaintab(maintabId) { 
        return await this.request({ endpoint: "maintabs/"+maintabId, method: "DELETE" });
    }
    
    // Subtabs

    async listSubtabsByMain(maintabId) {
        return await this.request({ endpoints: "subtabs/main/"+maintabId, method: "GET" });
    }

    async listSubtabsBySubtab(subtabId) {
        return await this.request({ endpoints: "subtabs/sub/"+subtabId, method: "GET" });
    }

    async createSubtabFromMain(details) {
        return await this.request({ endpoint: "subtabs/main/create", method: "POST", data: details });
    }

    async createSubtabFromSub(details) {
        return await this.request({ endpoint: "subtabs/sub/create", method: "POST", data: details });
    }

    async deleteSubtab(subtabId) {
        return await this.request({ endpoint: "subtabs/"+subtabId, method: "DELETE" });
    }
}

export default new ApiClient("http://localhost:3002");
