import React from 'react';
import { useForm } from 'react-hook-form';
import request from 'modules/auth/request';
import { useHistory } from 'react-router-dom';

import styles from './styles.m.scss';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = (data) => {
        request.post('/login', {
            ...data
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            history.push('/')
        });
    }

    const handleOnRegistrate = () => {
        history.push('/registrate');
    }

    return (
        <div className={`${styles.login}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`card`}>
                    <div className={`card-body`}>
                        <h5 className="card-title">Login</h5>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input ref={register} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref={register} name="password" type="password" className="form-control" id="password" />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        <button className="btn btn-primary mt-3" onClick={handleOnRegistrate}>Registrate</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;