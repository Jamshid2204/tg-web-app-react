import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import Form from '../Form/Form';


const DI = [
    {id: '1', title: 'Komputer tarmoqlari', price: 672000, description: '6 kridit'},
    {id: '1', title: 'Dasturiy taminot tizimlarini loyihalash', price: 672000, description: '6 kridit'},
    {id: '1', title: `Inson komputer o'zaro ta'sri`, price: 672000, description: '6 kridit'},
    {id: '1', title: 'Dasturlash uslublari va paradigmalar', price: 672000, description: '6 kridit'},
    {id: '1', title: 'Pedagogika. Psixologiya', price: 448000, description: '4 kridit'},
    {id: '1', title: 'Individua loyiha', price: 224000, description: '2 kridit'},
]
const KI = [
    {id: '1', title: 'komputer tarmoqlari', price: 672000, description: '6 kridit'},
    {id: '2', title: 'dasturiy taminot tizimlarini loyihalash', price: 672000, description: '6 kridit'},
    {id: '3', title: `inson komputer o'zaro ta'sri`, price: 672000, description: '6 kridit'},
    {id: '4', title: 'dasturlash uslublari va paradigmalar', price: 672000, description: '6 kridit'},
    {id: '5', title: 'pedagogika. Psixologiya', price: 448000, description: '4 kridit'},
    {id: '6', title: 'individua loyiha', price: 224000, description: '2 kridit'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = ({subject, course}) => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    

    const onSendData = useCallback(() => {
        const data = {
            DI: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Hammasi ${getTotalPrice(newItems)}`
            })
        }
    }

    // const array = (subject) => {
    //     if ({subject}) {
            
    //     }
    // }

    return (
        <div className={'list'}> 
            {subject === 'Dasturiy injiniring' & course === '1-semestr'
            ? DI.map(item => ( <ProductItem product={item} onAdd={onAdd} className={'item'}/>))
            : KI.map(item => ( <ProductItem product={item} onAdd={onAdd} className={'item'}/>))
            }
        </div>
    );
};

export default ProductList;
