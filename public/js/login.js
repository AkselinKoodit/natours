/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    console.log(email, password);
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password,
            },
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in succesfully! Welcome!');
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
            url: '/api/v1/users/logout',
        });
        if ((res.data.status = 'success')) location.reload();
    } catch (err) {
        showAlert('error', 'Error loggin out, try again.');
    }
};
