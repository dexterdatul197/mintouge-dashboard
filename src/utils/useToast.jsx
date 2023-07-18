import { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const useToast = () => {
    useEffect(() => {
        toastr.options = {
            positionClass: "toast-bottom-center",
            timeOut: 5000,
            closeButton: true,
            preventDuplicates: false,
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

    return showToast;
};

export default useToast;