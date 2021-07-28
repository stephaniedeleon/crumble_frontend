import axios from "axios";

class ApiClient {

    constructor(remoteHostUrl) {

        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "token";
    }

    // utility method...
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

    // Token

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


    // Main Tabs

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
    
    async updateMaintab(maintabId, details) { 
        return await this.request({ endpoint: "maintabs/"+maintabId, method: "PUT", data: details });
    }
    
    // Subtabs

    async getSubtab(subtabId) {
        return await this.request({ endpoint: "subtabs/"+subtabId, method: "GET" });
    }

    async listSubtabsByMain(maintabId) {
        return await this.request({ endpoint: "subtabs/main/"+maintabId, method: "GET" });
    }

    async listSubtabsBySubtab(subtabId) {
        return await this.request({ endpoint: "subtabs/sub/"+subtabId, method: "GET" });
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

    async markSubtab(subtabId) {
        return await this.request({ endpoint: "subtabs/mark/"+subtabId, method: "PUT" });
    }

    async unmarkSubtab(subtabId) {
        return await this.request({ endpoint: "subtabs/unmark/"+subtabId, method: "PUT" });
    }

    async getDirectoryData(maintabId) {
        const value = await this.request({ endpoint: "subtabs/"+maintabId+"/directory", method: "GET" })
        return value.data
    }

    // Tasks

    async listTasksByMain(maintabId) {
        return await this.request({ endpoint: "tasks/main/"+maintabId, method: "GET" });
    }

    async listTasksBySubtab(subtabId) {
        return await this.request({ endpoint: "tasks/sub/"+subtabId, method: "GET" });
    }

    async createTaskFromMain(details) {
        return await this.request({ endpoint: "tasks/main/create", method: "POST", data: details });
    }

    async createTaskFromSub(details) {
        return await this.request({ endpoint: "tasks/sub/create", method: "POST", data: details });
    }

    async deleteTask(taskId) {
        return await this.request({ endpoint: "tasks/"+taskId, method: "DELETE" });
    }

    async markTask(taskId) {
        return await this.request({ endpoint: "tasks/mark/"+taskId, method: "PUT" });
    }

    async unmarkTask(taskId) {
        return await this.request({ endpoint: "tasks/unmark/"+taskId, method: "PUT" });
    }

    // Calendar Events

    async listEventsByMaintab(maintabId) {
        return await this.request({ endpoint: "calendar/main/"+maintabId, method: "GET" });
    }

    async listEventsBySubtab(subtabId) {
        return await this.request({ endpoint: "calendar/sub/"+subtabId, method: "GET" });
    }

    async createEventForMain(details) { 
        return await this.request({ endpoint: "calendar/main/create", method: "POST", data: details });
    }

    async createEventForSub(details) { 
        return await this.request({ endpoint: "calendar/sub/create", method: "POST", data: details });
    }

    async deleteEvent(eventId) {
        return await this.request({ endpoint: "calendar/"+eventId, method: "DELETE" });
    }

    // Notes

    async listNotesByMaintab(maintabId) {
        return await this.request({ endpoint: "notes/main/"+maintabId, method: "GET" });
    }

    async listNotesBySubtab(subtabId) {
        return await this.request({ endpoint: "notes/sub/"+subtabId, method: "GET" });
    }

    async createNoteFromMain(details) {
        return await this.request({ endpoint: "notes/main/create", method: "POST", data: details });
    }

    async createNoteFromSub(details) {
        return await this.request({ endpoint: "notes/sub/create", method: "POST", data: details });
    }

    async deleteNote(noteId) {
        return await this.request({ endpoint: "notes/"+noteId, method: "DELETE" });
    }

}

export default new ApiClient("http://localhost:3002");
