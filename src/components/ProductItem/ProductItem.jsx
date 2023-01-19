import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import { useState } from 'react';

const ProductItem = ({ product, className, onAdd }) => {
    const [color, setColor] = useState("blue");
    const [text, setText] = useState("Qoshish");

    const onAddHandler = () => {
        if (text === "Qoshish") {
            setText("Qoshildi");
            onAdd(product);
            setColor("red");
        } else {
            setText("Qoshish");
            onAdd(product);
            setColor("red");
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
