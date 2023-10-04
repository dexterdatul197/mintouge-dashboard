import * as yup from 'yup';

import { apiGet, apiPost, apiPut, API_ENDPOINT } from './baseApi';

/**
 * This function validates the product response coming from backend.
 * 
 * @param {UserModelValidator} product An product object or an array of products
 */
const userValidate = async (user) => {
    try {
        const validatedResponse = await UserModelValidator.validate(user);

        return validatedResponse;
    } catch (validationError) {
        console.error(validationError);
        throw validationError;
    }
}

export const UserModelValidator = yup.object().shape({
    id: yup.number().required('User ID is missing'),
    email: yup.string().required('User Email is invalid.'),
    firstName: yup.string().required('User First Name is invalid.'),
    lastName: yup.string().required('User Last Name is invalid.'),
    brandName: yup.string().required('Brand Name is invalid.'),
    apiSecretKey: yup.string().required('API Secret Key is invalid.'),
    apiPublicKey: yup.string().required('API Public Key is invalid.'),
    
    walletId: yup.string().optional('Wallet ID is invalid.').nullable(),
    address: yup.string().optional().nullable(),
    phone: yup.string().optional().nullable(),
    siteUrl: yup.string().optional().nullable(),
});

/**
 * Sign in to Brand Dashboard backend.
 * The API response will send cookies as well,
 * so the next APIs will be sent with the cookie.
 * 
 * @param {string} email A user's email
 * @param {string} password A user's password
 * @returns {UserModelValidator} A User object.
 */
export const signIn = async ({ email, password }) => {
    try {
        const user = await apiPost({
            url: '/auth/login',
            bodyParam: { email, password },
        });

        await userValidate(user);
        return user;
    } catch (error) {
        // Handle any network or server errors
        console.error('[Error] Login Failed.', error);
        throw error;
    }
};
/**
 * Email Verification
 * The API sends 6-digital code that were sent by third party servers
 * so that it can verify if the user access is permitted 
 * @param {string} token A simple 6 digital verification code
 */

export const verifyEmail = async (verify) => {
    const id = await apiPost({
        url: '/auth/verify-email',
        bodyParam: { token: verify }
    });
    return id;
};

/**
 * Sign up to Brand Dashboard backend.
 * The API response will send a verification email.
 * so the user should have to sign in after the account creation.
 * 
 * @param {string} email A user's email
 * @param {string} password A user's password
 * @param {string} firstName A user's first name
 * @param {string} lastName A user's last name
 * @param {string} brandName A brand name like Gucci or Nike
 * @returns {UserModelValidator} A newly created user.
 */
export const signUp = async (userInfo) => {
    try {
        const user = await apiPost({
            url: '/auth/signup',
            bodyParam: userInfo,
        });

        await userValidate(user);
        return user;
    } catch (error) {
        // Handle any network or server errors
        console.error('[Error] Sign up Failed.', error);
        throw error;
    }
}

/**
 * Google Login in API.
 * Internally, /auth/google API will send redirect url as a response.
 * /auth/google => google auth redirect url => /auth/callback => user object.
 * In general, just calling /auth/google api is enough, but as we are calling this api inside iframe,
 * parent site redirection is not allowed.
 * So we will open a popup window to do this kinda redirection.
 * The backend will send a html page firing postMessage with user object.
 * 
 * @returns {UserModelValidator} A User object.
 */
export const signInGoogle = () => {
    const xcode = 'mini';
    return new Promise((resolve, reject) => {
        const popup = window.open(
            `${API_ENDPOINT}/auth/google?windowId=${xcode}`, 
            '_blank', 
            'popup,height=800,width=600'
        );

        const checkPopupClosed = setInterval(function() {
            if (popup.closed !== false) {
                clearInterval(checkPopupClosed);
                reject('User declined to login.');
            }
        }, 1000);

        window.addEventListener('message', (event) => {
            const data = event?.data;
            if (data?.windowId !== xcode) {
                return;
            }

            if (data.type === 'auth') {
                resolve(data.user);
            } else {
                reject('User declined to login.');
            }
            popup.close();

        });
    });
};

/**
 * Apple Login in API.
 * Same as Google Login
 * 
 * @returns {UserModelValidator} A User object.
 */
export const signInApple = () => {
    const xcode = 'mini';
    return new Promise((resolve, reject) => {
        const popup = window.open(
            `${API_ENDPOINT}/auth/apple?windowId=${xcode}`, 
            '_blank', 
            'popup,height=800,width=600'
        );

        const checkPopupClosed = setInterval(function() {
            if (popup.closed !== false) {
                clearInterval(checkPopupClosed);
                reject('User declined to login.');
            }
        }, 1000);

        window.addEventListener('message', (event) => {
            const data = event?.data;
            if (data?.windowId !== xcode) {
                return;
            }

            if (data.type === 'auth') {
                resolve(data.user);
            } else {
                reject('User declined to login.');
            }
            popup.close();

        });
    });
};

/**
 * Resend Verification API
 * This is bound to send verification code
 * when custom user have trouble verification.
 * @param {string} email address link to be sent 
 */

export const resedVerification = async (email) => {
    await apiGet({
        url: '/auth/resend-verification',
        queryParams: { email }
    });
}

/**
 * Resend Verification API
 * This is bound to send verification code
 * when custom user have trouble verification.
 * @param {string} email address link to be sent 
 */

export const updateBrand = async (brand) => {
    try {
        const newBrand = await apiPut({
            url: '/user',
            bodyParam: brand,
        });

        return newBrand;
    } catch (error) {
        // Handle any network or server errors
        console.error('[Error] Brand Update Failed.', error);
        throw error;
    }
}