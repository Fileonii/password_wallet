import { IProducts, IPurchase } from "../helpers";
import { ApiClient } from "./Api"
import { productsByIdEndpoint, productsEndpoint, purchaseByIdEndpoint, purchaseEndpoint } from "../endpoints"

class ProductsService {
    static async getProducts(): Promise<IProducts[]> {
        const api = new ApiClient()
        return await api.get(productsEndpoint())
    }

    static async getProductsById(id: number): Promise<IProducts> {
        const api = new ApiClient()
        return await api.get(productsByIdEndpoint(id))
    }

    static async createProducts(): Promise<IProducts> {
        const api = new ApiClient()
        return await api.get(productsEndpoint(), {})
    }
}

export default ProductsService