import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState, saveState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)


    useEffect(() => {
        saveState('hw9-date', date.getTime())
    }, [date])

    const start = () => {
        const id = window.setInterval(() => {
            setDate(new Date())
        }, 1000)
        setTimerId(id)

    }

    const stop = () => {
        if (timerId) {
            clearInterval(timerId)
            setTimerId(undefined)
        }
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }
    const formatTime = (value: number): string => {
        return value < 10 ? `0${value}` : `${value}`
    }


    const stringTime = `${formatTime(date.getHours())}:${formatTime(
        date.getMinutes()
    )}:${formatTime(date.getSeconds())}`
    const stringDate = `${formatTime(date.getDate())}.${formatTime(
        date.getMonth() + 1
    )}.${date.getFullYear()}`


    const stringDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(
        date
    )
    const stringMonth = new Intl.DateTimeFormat('en', { month: 'long' }).format(
        date
    )

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'} className={s.day}>{stringDay}</span>,{' '}
                <span id={'hw9-time'} className={s.time}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock



