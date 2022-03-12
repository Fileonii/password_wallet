import axios from "axios";


export class ApiClient {
    apiUrl: string = "http://localhost:4000";

    private buildApiUrl(path: string): string {
        return this.apiUrl + path
    }

    async get(path: string, body?: any): Promise<any> {
        const res = await axios({
            method: 'get',
            url: this.buildApiUrl(path),
            data: body
        })
        const { data } = res;
        return data
    }

    async post(path: string, body?: any): Promise<any> {
        const res = axios({
            method: 'post',
            url: this.buildApiUrl(path),
            data: body
        })
        const { data } = await res;
        return data
    }

    async put(path: string, body?: any): Promise<any> {
        const res = axios({
            method: 'put',
            url: this.buildApiUrl(path),
            data: body
        })
        const { data } = await res;
        return data
    }

    async patch(path: string, body?: any): Promise<any> {
        const res = axios({
            method: 'patch',
            url: this.buildApiUrl(path),
            data: body
        })
        const { data } = await res;
        return data
    }

    async delete(path: string, body?: any): Promise<any> {
        const res = axios({
            method: 'delete',
            url: this.buildApiUrl(path),
            data: body
        })
        const { data } = await res;
        return data
    }

}

