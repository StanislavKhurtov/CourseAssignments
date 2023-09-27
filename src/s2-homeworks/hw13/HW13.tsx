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
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test'

        if (x === true) {
            setCode('Код 200!')
            setImage(success200)
            setText('...всё ок) \nкод 200 - обычно означает что скорее всего всё ок')
            setInfo('...loading')
            setButtonsDisabled(true);

        } else if (x === false) {
            setCode('Ошибка 400!')
            setImage(error400)
            setText('Ты не отправил success в body вообще!\n' +
                'ошибка 400 - обычно означает что скорее всего фронт\n' +
                'отправил что-то не то на бэк!')
            setButtonsDisabled(true);

        } else if (x === undefined) {
            setCode('Ошибка 500!')
            setImage(error500)
            setText('эмитация ошибки на сервере\n' +
                'ошибка 500 - обычно означает что что-то сломалось на \n' +
                'сервере, например база данных)')
            setButtonsDisabled(true);

        } else if (x === null) {
            setCode('Error!')
            setImage(errorUnknown)
            setText('Network Error \n' +
                'AxiosError')
            setButtonsDisabled(true);

        }

        axios.post(url, {success: x})
            .then((res) => {
                setButtonsDisabled(false);
                setInfo('')
            })
            .catch((e) => {
                setButtonsDisabled(false);
                setInfo('')
            })
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