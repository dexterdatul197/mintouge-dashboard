import { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const useToast = () => {
    useEffect(() => {
        toastr.options = {
            positionClass: 'toastr-bottom-center',
            timeOut: 3000,
            closeButton: true,
            preventDuplicates: true,
        };
    }, []);

    const showToast = (message, type = 'success') => {
        if (type === 'warning') {
            toastr.warning(message);
        } else if (type === 'error') {
            toastr.error(message);
        } else if (type === 'info') {
            toastr.info(message);
        } else {
            toastr.success(message);
        }
    }

    return { toastr, showToast };
};

export default useToast;