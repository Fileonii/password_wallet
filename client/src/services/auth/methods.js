import ApiService from "../api"

const authMethods = {
    login: async ({ accessToken, ...props }) => {
        // TODO
        const _api = ApiService(accessToken)
        console.log("login")
        return _api.login(props)
    },
    register: async ({ accessToken, ...props }) => {
        // TODO
        const _api = ApiService(accessToken)
        console.log("register")
        return _api.register(props)
    },
    logout: async ({ accessToken }) => {
        // TODO
        console.log("should login now")
        //return _api.login(props)
    },
}

export { authMethods }
