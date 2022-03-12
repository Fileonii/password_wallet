import { IContractors, IProducts, IPurchase } from "../helpers";
import { ApiClient } from "./Api"
import { purchaseByIdEndpoint, purchaseEndpoint } from "../endpoints"

class PurchaseService {
    static async getPurchase(): Promise<IPurchase[]> {
        const api = new ApiClient()
        return await api.get(purchaseEndpoint())
    }
    static async createPurchase(contrator: IContractors, products: IProducts[]) {
        const api = new ApiClient()
        return await api.post(purchaseEndpoint(), {
            seller: contrator.seller,
            buyer: contrator.buyer,
            products: products
        })
    }
}

export default PurchaseService