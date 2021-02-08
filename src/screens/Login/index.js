import React from 'react';
import { useForm } from 'react-hook-form';

import styles from  './styles.m.scss';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (e) => {
        console.log(e);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class={`card ${styles.card}`}>
                    <div class={`card-body`}>
                        <h5 class="card-title">Login</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input ref={register} name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input ref={register} name="password" type="password" class="form-control" id="password" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;