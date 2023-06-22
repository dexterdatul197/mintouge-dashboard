export const API_ENDPOINT = process.env.VITE_APP_ENDPOINT || 'localhost:3000';

export const getProducts = async ({ brands, password }) => {
    try {
        const response = await fetch(
            API_ENDPOINT + '/auth/signin', {
            method: 'POST',
            body: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        }
        );

        if (response.ok) {
            // Login successful, handle the response
            const token = await response.json();
            console.log('Login successful:', token);
            
            return token;
        } else {
            // Login failed, handle the error
            console.log('Login failed:', response.status);
            throw 
        }
    } catch (error) {
        // Handle any network or server errors
        console.error('Error occurred:', error);
        throw error;
    }
};

export const signUp = async ({ email, password, brand }) => {
    try {
        const response = await fetch(
            API_ENDPOINT + '/auth/signup', {
            method: 'POST',
            body: {
                email: email,
                password: password,
                brand: brand,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );

        if (response.ok) {
            // Login successful, handle the response
            const token = await response.json();
            console.log('SignUp successful:', token);
            
            return token;
        } else {
            // Login failed, handle the error
            console.log('SignUp failed:', response.status);
            throw 
        }
    } catch (error) {
        // Handle any network or server errors
        console.error('Error occurred:', error);
        throw error;
    }
}

