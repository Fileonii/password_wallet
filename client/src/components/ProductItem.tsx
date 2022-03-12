import React, { useState } from 'react'
import { IProducts } from '../api/helpers'
import { useDrag } from 'react-dnd'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
interface IProps {
    product: IProducts;
    onStatusChange: (item: IProducts) => void;
    isChosen: boolean;
}
function ProductItem({ product, onStatusChange, isChosen }: IProps) {
    const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onStatusChange(product);

    }
    return (
        <div key={product.id} className="product-item" >
            <div className="product-item-label" style={{ textDecoration: isChosen ? "line-through" : "none" }}>{product.type}</div>
            <button className="product-item-add" onClick={handleClick} style={{ background: isChosen ? "red" : "green" }}>
                {isChosen ? <div><ClearRoundedIcon fontSize="small" /></div>
                    : <div><CheckRoundedIcon fontSize="small" /></div>
                }

            </button>

        </div>
    )
}

export default ProductItem
