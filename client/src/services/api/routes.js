const ApiRoutes = (ApiService) => {
    // auth endpoints
    const login = async ({ login, password }) =>
        ApiService.post(`/auth/signin`, { username: login, password: password })
    const register = async ({ login, password, encMethod }) =>
        ApiService.post(`/auth/signup`, {
            username: login,
            password: password,
            encryption: encMethod,
        })

    const changePassword = async ({ password }) =>
        ApiService.put(`/auth/password`, {
            password: password,
        })

    // password endpoints
    const getPasswords = async () => ApiService.get(`/password`)
    const getDecryptedPassword = async (id) => ApiService.get(`/password/${id}`)
    const postPassword = async () => ApiService.post(`/password`)

    return {
        login,
        register,
        getPasswords,
        getDecryptedPassword,
        postPassword,
    }
}

export default ApiRoutes
