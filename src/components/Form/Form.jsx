import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import ProductList from '../ProductList/ProductList';

const Form = () => {
    const [subject, setSubject] = useState('Dasturiy injiniring');
    const [course, setCourse] = useState('1-semestr');
    const {tg} = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            subject,
            course,
        }
        tg.sendData(JSON.stringify(data));
    }, [subject, course])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: `Ma'lumotlarni qabul qilish`
        })
    }, [])

    // useEffect(() => {
    //     if(!subject || !course) {
    //         tg.MainButton.show();
    //     } else {
    //         tg.MainButton.show();
    //     }
    // }, [course, subject])

    // const onChangeCountry = (e) => {
    //     setCountry(e.target.value)
    // }

    // const onChangeStreet = (e) => {
    //     setStreet(e.target.value)
    // }

    

    // function changeSubject() {
    //     setSubject(e.target.value)
    //     console.log(setSubject);
    // }
    // function changeCourse() {
    //     setCourse(e.target.value)
    // }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }
    const onChangeCourse = (e) => {
        setCourse(e.target.value)
    }

    return (
        
            <div className={"form"}>
            <h3>Ma'lumotlarni to'ldiring</h3>
            
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'Dasturiy injiniring'} >Dasturiy injiniring</option>
                <option value={'Komputer injiniring'} >Komputer injiniring</option>
            </select>
            <select value={course} onChange={onChangeCourse} className={'select'}>
                <option disabled value={'1-semestr'} >1 semestr</option>
                <option value={'2-semestr'} >2 semestr</option>
                <option value={'3-semestr'} >3 semestr</option>
                <option value={'4-semestr'} >4 semestr</option>
                <option value={'5-semestr'} >5 semestr</option>
                <option value={'6-semestr'} >6 semestr</option>
                <option value={'7-semestr'} >7 semestr</option>
                <option value={'8-semestr'} >8 semestr</option>
            </select>
            <h1>{subject}</h1>
            <h1>{course}</h1>
            <ProductList
            subject={subject}
            course={course}
            />
        </div>
        
    );
};

export default Form;
