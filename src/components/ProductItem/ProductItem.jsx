import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import { useState } from 'react';

const ProductItem = ({ product, className, onAdd }) => {
    const [color, setColor] = useState("rgb(82, 136, 193)");
    const [text, setText] = useState("Qoshish");

    const onAddHandler = () => {
        if (text === "Qoshish") {
            setText("Qoshildi");
            onAdd(product);
            setColor("rgb(63, 103, 145)");
        } else {
            setText("Qoshish");
            onAdd(product);
            setColor("rgb(63, 103, 145)");
        }
        
    }

    return (
        <div className={'product ' + className}>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Summasi: <b>{product.price}</b></span>
            </div>
            <Button style={{color: color}} className={'add-btn'} onClick={onAddHandler}>
                {text}
            </Button>
        </div>
    );
};

export default ProductItem;
