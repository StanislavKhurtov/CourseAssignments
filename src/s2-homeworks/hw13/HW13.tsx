import React, {useState} from 'react';
import s2 from '../../s1-main/App.module.css';
import s from './HW13.module.css';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import axios from 'axios';
import success200 from './images/200.svg';
import error400 from './images/400.svg';
import error500 from './images/500.svg';
import errorUnknown from './images/error.svg';

const HW13 = () => {
    const [code, setCode] = useState('');
    const [text, setText] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState('');
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://samurai.it-incubator.io/api/3.0/homework/test665' // имитация запроса на не корректный адрес
                : 'https://samurai.it-incubator.io/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        setButtonsDisabled(true)
        axios.post(url, {success: x})
            .then(() => {
                setCode('Код 200!')
                setImage(success200)
                setText('...всё ок)');
                setInfo('код 200 - обычно означает что скорее всего всё ок)');
            })
            .catch((e) => {
                if (e.response) {
                    if (e.response.status === 400) {
                        setCode('Ошибка 400!');
                        setImage(error400);
                        setText('Ты не отправил success в body вообще!');
                        setInfo('ошибка 400 - обычно означает что скорее всего фронт отправил что-то не то на бэк!');
                        setButtonsDisabled(false);
                    } else if (e.response.status === 500) {
                        setCode('Ошибка 500!');
                        setImage(error500);
                        setText('эмитация ошибки на сервере');
                        setInfo('ошибка 500 - обычно означает что что-то сломалось на сервере, например база данных)');
                        setButtonsDisabled(false);
                    } else {
                        setCode('Error!');
                        setImage(errorUnknown);
                        setText('Network Error');
                        setInfo('AxiosError');
                        setButtonsDisabled(false);
                    }
                } else {
                    setCode('Error!');
                    setImage(errorUnknown);
                    setText('Network Error');
                    setInfo('AxiosError');
                    setButtonsDisabled(false);
                }
            })
            .finally(() => {
                setButtonsDisabled(false);
            });
    }

    return (
        <div id={'hw13'} className={s2.hw13}>
            <div className={s2.container}>
                <div className={s2.hwTitle}>Hometask № 13</div>

                <div className={s.body}>
                    <div className={s.buttonsContainer}>
                        <SuperButton
                            id={'hw13-send-true'}
                            onClick={send(true)}
                            xType={'secondary'}
                            disabled={buttonsDisabled}
                        >
                            Send true
                        </SuperButton>
                        <SuperButton
                            id={'hw13-send-false'}
                            onClick={send(false)}
                            xType={'secondary'}
                            disabled={buttonsDisabled}
                        >
                            Send false
                        </SuperButton>
                        <SuperButton
                            id={'hw13-send-undefined'}
                            onClick={send(undefined)}
                            xType={'secondary'}
                            disabled={buttonsDisabled}
                        >
                            Send undefined
                        </SuperButton>
                        <SuperButton
                            id={'hw13-send-null'}
                            onClick={send(null)} // имитация запроса на не корректный адрес
                            xType={'secondary'}
                            disabled={buttonsDisabled}
                        >
                            Send null
                        </SuperButton>
                    </div>

                    <div className={s.responseContainer}>
                        <div className={s.imageContainer}>
                            {image && <img src={image} className={s.image} alt="status"/>}
                        </div>

                        <div className={s.textContainer}>
                            <div id={'hw13-code'} className={s.code}>
                                {code}
                            </div>
                            <div id={'hw13-text'} className={s.text}>
                                {text}
                            </div>
                            <div id={'hw13-info'} className={s.info}>
                                {info}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HW13;