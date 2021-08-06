/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
    console.log(name, email, password, passwordConfirm);
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
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
