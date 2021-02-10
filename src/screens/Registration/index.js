import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import styles from './styles.m.scss';

const Registration = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios.post('http://localhost:9010/registrate', {
            ...data
        });
    }

    return (
        <div className={`${styles.login}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class={`card`}>
                    <div class={`card-body`}>
                        <h5 class="card-title">Login</h5>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input ref={register} name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input ref={register} name="password" type="password" class="form-control" id="password" />
                        </div>

                        <button type="submit" class="btn btn-primary mt-3">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Registration;
