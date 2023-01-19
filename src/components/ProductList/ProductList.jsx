import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import Form from '../Form/Form';


const data = [
    {id: '1', subject:"Dasturiy injiniring", course:"3-semestr", title: 'Kiberxavfsizlik asoslari', price: 672000, description: '6 kridit'},
    {id: '2', subject:"Dasturiy injiniring", course:"3-semestr", title: 'Malumotlar tuzilmasi va algoritmlar', price: 672000, description: '6 kridit'},
    {id: '3', subject:"Dasturiy injiniring", course:"3-semestr", title: `Elektronika va sxemalar 1`, price: 672000, description: '6 kridit'},
    {id: '4', subject:"Dasturiy injiniring", course:"3-semestr", title: 'Diskret tuzilmalar', price: 672000, description: '6 kridit'},
    {id: '5', subject:"Dasturiy injiniring", course:"3-semestr", title: 'Web dasturlashga kirish', price: 448000, description: '6 kridit'},

    {id: '6', subject:"Dasturiy injiniring", course:"4-semestr", title: 'Malumotlar bazasi', price: 672000, description: '6 kridit'},
    {id: '7', subject:"Dasturiy injiniring", course:"4-semestr", title: 'Kompyuterning tashkil etilishi', price: 672000, description: '6 kridit'},
    {id: '8', subject:"Dasturiy injiniring", course:"4-semestr", title: `Algoritmlarni loyihlash`, price: 672000, description: '6 kridit'},
    {id: '9', subject:"Dasturiy injiniring", course:"4-semestr", title: 'Dasturiy injiniringga kirish', price: 672000, description: '6 kridit'},
    {id: '10', subject:"Dasturiy injiniring", course:"4-semestr", title: 'Ehtimollik va statistika', price: 448000, description: '6 kridit'},

    {id: '11', subject:"Dasturiy injiniring", course:"5-semestr", title: 'Komputer tarmoqlari', price: 672000, description: '6 kridit'},
    {id: '12', subject:"Dasturiy injiniring", course:"5-semestr", title: 'Dasturiy taminot tizimlarini loyihalash', price: 672000, description: '6 kridit'},
    {id: '13', subject:"Dasturiy injiniring", course:"5-semestr", title: `Inson komputer o'zaro ta'sri`, price: 672000, description: '6 kridit'},
    {id: '14', subject:"Dasturiy injiniring", course:"5-semestr", title: 'Dasturlash uslublari va paradigmalar', price: 672000, description: '6 kridit'},
    {id: '15', subject:"Dasturiy injiniring", course:"5-semestr", title: 'Pedagogika. Psixologiya', price: 448000, description: '4 kridit'},
    {id: '16', subject:"Dasturiy injiniring", course:"5-semestr", title: 'Individua loyiha', price: 224000, description: '2 kridit'},

    {id: '17', subject:"Komputer injiniring", course:"3-semestr", title: 'Kiberxavfsizlik asoslari', price: 672000, description: '6 kridit'},
    {id: '18', subject:"Komputer injiniring", course:"3-semestr", title: 'Malumotlar tuzilmasi va algoritmlar', price: 672000, description: '6 kridit'},
    {id: '19', subject:"Komputer injiniring", course:"3-semestr", title: `Elektronika va sxemalar 1`, price: 672000, description: '6 kridit'},
    {id: '20', subject:"Komputer injiniring", course:"3-semestr", title: 'Diskret tuzilmalar', price: 672000, description: '6 kridit'},
    {id: '21', subject:"Komputer injiniring", course:"3-semestr", title: 'Web dasturlashga kirish', price: 448000, description: '6 kridit'},

    {id: '22', subject:"Komputer injiniring", course:"4-semestr", title: 'Malumotlar bazasi', price: 672000, description: '6 kridit'},
    {id: '23', subject:"Komputer injiniring", course:"4-semestr", title: 'Kompyuterning tashkil etilishi', price: 672000, description: '6 kridit'},
    {id: '24', subject:"Komputer injiniring", course:"4-semestr", title: `Algoritmlarni loyihlash`, price: 672000, description: '6 kridit'},
    {id: '25', subject:"Komputer injiniring", course:"4-semestr", title: 'Dasturiy injiniringga kirish', price: 672000, description: '6 kridit'},
    {id: '26', subject:"Komputer injiniring", course:"4-semestr", title: 'Ehtimollik va statistika', price: 448000, description: '6 kridit'},

    {id: '27', subject:"Komputer injiniring", course:"5-semestr", title: 'Komputer tarmoqlari', price: 672000, description: '6 kridit'},
    {id: '28', subject:"Komputer injiniring", course:"5-semestr", title: 'Dasturiy taminot tizimlarini loyihalash', price: 672000, description: '6 kridit'},
    {id: '29', subject:"Komputer injiniring", course:"5-semestr", title: `Inson komputer o'zaro ta'sri`, price: 672000, description: '6 kridit'},
    {id: '30', subject:"Komputer injiniring", course:"5-semestr", title: 'Dasturlash uslublari va paradigmalar', price: 672000, description: '6 kridit'},
    {id: '31', subject:"Komputer injiniring", course:"5-semestr", title: 'Pedagogika. Psixologiya', price: 448000, description: '4 kridit'},
    {id: '32', subject:"Komputer injiniring", course:"5-semestr", title: 'Individua loyiha', price: 224000, description: '2 kridit'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const [subjectFilter, setSubjectFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState('');

    const filteredData = data.filter(item => {
        if (item.subject !== subjectFilter) {
            return false;
        }

        if (item.course !== courseFilter) {
            return false;
        }

        return true;
    });

    console.log(filteredData);
    

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
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
        <div className={'post'}>
            <div className='form'>
            <select className='select' value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
                <option value="">Yonalish</option>
                <option value="Dasturiy injiniring">Dasturiy injiniring</option>
                <option value="Komputer injiniring">Komputer injiniring</option>
            </select>

            <select className='select' value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
                <option value="">Semestr</option>
                <option value="1-semestr">1 semestr</option>
                <option value="2-semestr">2 semestr</option>
                <option value="3-semestr">3 semestr</option>
                <option value="4-semestr">4 semestr</option>
                <option value="5-semestr">5 semestr</option>
                <option value="6-semestr">6 semestr</option>
                <option value="7-semestr">7 semestr</option>
                <option value="8-semestr">8 semestr</option>
            </select>
            </div>
            <div className='list'>
            {filteredData.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            </div>
        </div>
    );
};

export default ProductList;
