import { useState } from 'react'
import './StyleLogin.sass'
import {useDispatch} from 'react-redux'
import { addName } from '../../redux/name'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [username, setUsername] = useState<string> ('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addName(username))
        navigate('/Home')
    }

    return (
        <section className='login'>
            <main className='login-container'>
                <h1 className='login-container-title'>Welcome to CodeLeap network!</h1>
                <form className='login-container-form' onSubmit={handleSubmit}> 
                    <label className='login-container-form-label'>Please enter your username</label>
                    <input className='login-container-form-name' type={'text'} onChange={(e) => setUsername(e.target.value)}></input>
                    <input className='login-container-form-button'  disabled={username === ''} style={{opacity: username === '' ? "60%": "100%"}}value="ENTER" type={'submit'}></input>
                </form>
            </main>
        </section>
    )
}
