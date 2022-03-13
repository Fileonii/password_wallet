import createApiInstance from "./createApiInstance"
import ApiRoutes from "./routes"

const API_URL = "http://localhost:4000/"

const ApiService = (authToken) => {
    const apiInstance = createApiInstance(API_URL, authToken)

    const routes = ApiRoutes(apiInstance)

    return {
        ...routes,
    }
}

export default ApiService
