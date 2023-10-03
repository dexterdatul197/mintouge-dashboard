import { apiUpload } from './baseApi';

/**
 * An API to upload specific user resources.
 * 
 * @param {File} file file to upload
 * @returns
 */

export const uploadFile = async (file, option) => {

    try {
        const formData = new FormData();
        formData.append('file', file);
        const link = await apiUpload({
            url: '/upload/file',
            bodyParam: { file: formData.get("file"), ...option?.img }
        });

        return link;
    } catch (error) {
        // Handle any network or server errors
        console.error('[Error] Upload Failed.', error);
        throw error;
    }
};