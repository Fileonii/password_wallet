export interface IProducts {
    id: number;
    type: string;
}
export interface IPurchase {
    seller: string;
    buyer: string;
    products: IProducts[];
}
export interface IContractors {
    buyer: string;
    seller: string;
}