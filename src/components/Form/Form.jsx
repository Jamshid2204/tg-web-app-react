import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [subject, setSubject] = useState('physical');
    const [course, setCourse] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            subject,
            course
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
    //     if(!street || !country) {
    //         tg.MainButton.hide();
    //     } else {
    //         tg.MainButton.show();
    //     }
    // }, [country, street])

    // const onChangeCountry = (e) => {
    //     setCountry(e.target.value)
    // }

    // const onChangeStreet = (e) => {
    //     setStreet(e.target.value)
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
                <option value={'physical'}>Dasturiy injiniring</option>
                <option value={'legal'}>komputer injiniring</option>
            </select>
            <select value={course} onChange={onChangeCourse} className={'select'}>
                <option value={'1-kurs'}>1 kurs</option>
                <option value={'2-kurs'}>2 kurs</option>
                <option value={'3-kurs'}>3 kurs</option>
                <option value={'4-kurs'}>4 kurs</option>
            </select>
        </div>
    );
};

export default Form;
