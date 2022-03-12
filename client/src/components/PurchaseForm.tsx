
import React, { ChangeEvent, ComponentState, EventHandler, Fragment, useEffect, useState } from 'react'
import { DndProvider, DragObjectFactory, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProductsService from '../api/classes/Products';
import PurchaseService from '../api/classes/Purchase';
import { IContractors, IProducts } from '../api/helpers';
import ModalComponent from './Modal';
import ProductItem from './ProductItem';

interface IProductsState {
    productItem: IProducts;
    isChosen: boolean;
}
export interface IModalInfo {
    label: string,
    content: string
}

export default function PurchaseForm() {
    const [open, setOpen] = useState<boolean>(false);
    const [products, setProducts] = useState<IProductsState[]>([]);
    const [purchase, setPurchase] = useState<IContractors>({
        seller: "",
        buyer: ""
    });
    const [modalInfo, setModalInfo] = useState<IModalInfo>({
        label: "",
        content: ""
    })

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [search, setSearch] = useState<string>("");
    const returnFinalProducts = () => {
        const chosenProducts: IProductsState[] = products.filter((item) => { return item.isChosen == true; })
        let newProductState: IProducts[] = [];
        for (let i = 0; i < chosenProducts.length; i++) {
            newProductState[i] = {
                type: chosenProducts[i].productItem.type,
                id: chosenProducts[i].productItem.id
            }
        }
        return newProductState;
    }
    const getProducts = async () => {
        const fetchProducts: IProducts[] = await ProductsService.getProducts();
        let newProductState: IProductsState[] = [];
        for (let i = 0; i < fetchProducts.length; i++) {
            newProductState[i] = {
                productItem: fetchProducts[i],
                isChosen: false
            };
        }
        setProducts(newProductState);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPurchase({ ...purchase, [e.target.name]: e.target.value } as ComponentState);

    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const chosenProducts: IProducts[] = returnFinalProducts();
        if (!(chosenProducts.length == 0 || purchase?.buyer === "" || purchase?.seller === "")) {
            PurchaseService.createPurchase(purchase, chosenProducts);
            setModalInfo({
                label: "Sukces!",
                content: "Udało się pomyślnie dodać rekord"
            })
        } else {
            setModalInfo({
                label: "Uzupełnij dane!",
                content: "Nie wszystkie dane w formularzu zostaly uzupełnione. Proszę, zweryfikuj ich poprawność."
            })
        }
        setOpen(true);

    };
    const handleSearcher = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const handleProducts = (product: IProducts) => {
        const productsTemp = products.slice();
        productsTemp.forEach((item) => {
            if (item.productItem.id == product.id) {
                if (item.isChosen) {
                    item.isChosen = false;
                } else {
                    item.isChosen = true;
                }

            }
        })
        setProducts(productsTemp);

    }

    useEffect(() => {
        getProducts();
    }, []);
    return (

        <div className="purchase-component">
            {products.length > 0 ? (
                <div>
                    <form className="purchase-form">
                        <section className="purchase-form-section">
                            <input
                                className="form-input"
                                type="text"
                                name="buyer"
                                placeholder="Buyer Name"
                                value={purchase?.buyer}
                                onChange={handleChange}
                            >

                            </input>
                        </section>
                        <section className="purchase-form-section">
                            <input
                                className="form-input"
                                type="text"
                                name="seller"
                                placeholder="Seller Name"
                                value={purchase?.seller}
                                onChange={handleChange}
                            >
                            </input>
                        </section>
                        <section className="purchase-form-section">
                            <div className="product-box">
                                <input className="product-searcher"
                                    type="text"
                                    name="searcher"
                                    placeholder="Search for products"
                                    onChange={handleSearcher}
                                ></input>
                                {products.filter((item) => {
                                    if (search == "") {
                                        return item;
                                    }
                                    else if (item.productItem.type.toLowerCase().includes(search?.toLowerCase())) {
                                        return item;
                                    }
                                }).map((product) => {
                                    return <ProductItem product={product.productItem} onStatusChange={handleProducts} isChosen={product.isChosen} />
                                })}
                            </div>
                        </section>
                        <section className="purchase-form-section">
                            <button className="product-submit" onClick={handleSubmit}>Submit</button>
                        </section>

                    </form>
                    <ModalComponent onClose={handleClose} isOpen={open} infoMode={true} info={modalInfo}></ModalComponent></div>)
                : <h2 className="purchase-form-section">Refresh Page!</h2>}

        </div>

    )
}
