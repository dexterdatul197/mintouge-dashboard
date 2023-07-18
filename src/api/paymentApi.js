import * as yup from 'yup';

import { apiGet, apiPost, apiDelete } from './baseApi';

export const CardModelValidator = yup.object().shape({
    cardId: yup.string().required('Card ID should be string'),
    last4: yup.string().required('Last 4 digits should be string'),
    clientIp: yup.string().required('Client IP should be string'),
    brand: yup.string().required('Brand should be string'),
    expireMonth: yup.number().required('Expire Month should be number'),
    expireYear: yup.number().required('Expire Year should be number'),
});

/**
 * This function validates the card response coming from backend.
 * 
 * @param {CardModelValidator} card An card object or an array of cards
 */
const cardValidate = async (cards) => {
    try {
        if (Array.isArray(cards)) {
            for (let card of cards) {
                await CardModelValidator.validate(card);
            }
        } else {
            await CardModelValidator.validate(cards);
        }
    } catch (validationError) {
        console.error(validationError);
        throw validationError;
    }
}

/**
 * Get paginationized cards from backend.
 * 
 * There are 2 ways of getting cards from backend.
 * One is to use access_token given when logged in.
 * Another one is to use API_PRIVATE_KEY as a token.
 * As we send access_token by default in baseApi, we follow first one.
 * 
 * @param {number} page Page Number starting from 0
 * @param {number} pageSize Page Size. default is 15.
 * @returns An array of cards
 */
export const getCards = async () => {
    try {
        const response = await apiGet({
            url: '/payment/cards',
        });

        // await cardValidate(response.data);

        return response;
    } catch (error) {
        console.error('[Error] getCards Failed.', error);
        throw error;
    }
};

/**
 * Get a specific card based on card id.
 * 
 * if return value is undefined, it will show 404 Not Found Page.
 * 
 * @param {number} cardId ID of the selected card
 * @returns An object to describe details
 */
export const getCardDetail = async (cardId) => {
    try {
        const card = await apiGet({
            url: `/payment/${cardId}`,
        });

        await cardValidate(card);

        return card;
    } catch (error) {
        console.error('[Error] getCard Failed.', error);
        throw error;
    }
}

/**
 * Add a card to backend database and return the added on.
 * 
 * @param {CardModel} card A card name
 * @returns An added object. Undefined if failed.
 */
export const addCard = async (card) => {
    try {
        const newCard = await apiPost({
            url: '/payment/cards',
            bodyParam: card,
        });

        await cardValidate(newCard);

        return newCard;
    } catch (error) {
        console.error('[Error] Adding a Card Failed.', error);
        throw error;
    }
}

/**
 * Delete a card from backend database and return the deleted on.
 * 
 * @param {number} product A card id
 */
export const deleteCard = async (cardId) => {
    try {
        await apiDelete({
            url: `/payment/cards/${cardId}`,
        });
    } catch (error) {
        console.error('[Error] Delete Card Failed.', error);
        throw error;
    }
}

/**
 * Activate a card from backend database.
 * 
 * @param {number} product A card id
 */
export const activateCard = async (cardId) => {
    try {
        await apiPost({
            url: `/payment/cards/${cardId}/activate`,
        });
    } catch (error) {
        console.error('[Error] Activating a Card Failed.', error);
        throw error;
    }
}