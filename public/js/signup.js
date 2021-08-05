/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
    console.log(name, email, password, passwordConfirm);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm,
            },
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Signed up succesfully! Welcome!');
            window.setTimeout(() => {
                location.assign('/');
            }, 500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

export const logout = async () => {
    showAlert('success', 'Bye bye!');
    window.setTimeout(() => {
        location.assign('/');
    }, 500);
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout',
        });
        if ((res.data.status = 'success')) location.reload();
    } catch (err) {
        showAlert('error', 'Error loggin out, try again.');
    }
};
