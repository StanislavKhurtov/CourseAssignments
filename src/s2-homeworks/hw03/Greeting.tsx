import React, {ChangeEvent, KeyboardEvent} from 'react'
import s from './Greeting.module.css'

type GreetingPropsType = {
    name: string
    setNameCallback: (e: ChangeEvent<HTMLInputElement>) => void
    addUser: () => void
    onBlur: () => void
    onEnter: (e: KeyboardEvent<HTMLInputElement>) => void
    error: string
    totalUsers: number
    lastUserName?: string
}

// презентационная компонента (для верстальщика)
const Greeting: React.FC<GreetingPropsType> = (
    {
        name,
        setNameCallback,
        addUser,
        onEnter,
        onBlur,
        error,
        totalUsers,
        lastUserName,
    }
) => {
    const inputClass = error !== '' ? `${s.errorInput}` : '';

    const inputStyle = {
        fontFamily: 'Montserrat',
        width: "372px",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: " #000000",
        padding: "0px 10px",
        borderRadius: "5px",
    }

    return (
        <div id={'hw3-form'} className={s.greetingForm}>
            <div className={s.text}> {'Людей добавили: '}<span id={'hw3-users-total'}>{totalUsers}</span></div>

            <div className={s.inputAndButtonContainer}>
                <div className={s.inputButton3}>
                    <input
                        id={'hw3-input'}
                        value={name}
                        onChange={setNameCallback}
                        className={inputClass}
                        onKeyDown={onEnter}
                        onBlur={onBlur}
                        style={inputStyle}
                    />
                    <button
                        id={'hw3-button'}
                        onClick={addUser}
                        className={s.button}
                        disabled={!name.trim()}
                    >
                        Add
                    </button>
                </div>
                <div id={'hw3-error'} className={s.error}>
                    {error}
                </div>
            </div>

            {lastUserName && (
                <div className={s.greeting}>
                    Привет <span id={'hw3-last-user'}>{lastUserName}</span>!
                </div>
            )}
        </div>
    )
}

export default Greeting

