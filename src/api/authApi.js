import { apiPost, API_ENDPOINT } from "./baseApi";

export const signIn = async ({ email, password }) => {
    if (process.env.VITE_APP_MOCK_BACKEND) {
        return "0x13dd9dhee2xru";
    }

    try {
        const token = await apiPost({
            url: API_ENDPOINT + "/auth/signIn",
            bodyParam: { email, password },
            hasToken: false
        });

        return token;
    } catch (error) {
        // Handle any network or server errors
        console.error('[Error] Login Failed.', error);
        throw error;
    }
};

export const signUp = async ({ email, password, brand }) => {
    if (process.env.VITE_APP_MOCK_BACKEND) {
        return "0x13dd9dhee2xru";
    }

    try {
        const token = await apiPost({
            url: API_ENDPOINT + "/auth/signUp",
            bodyParam: { email, password, brand },
            hasToken: false
        });

        return token;
    } catch (error) {
        // Handle any network or server errors
        console.error('[Error] Login Failed.', error);
        throw error;
    }
}

