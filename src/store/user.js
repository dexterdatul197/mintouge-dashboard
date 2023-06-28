import { atom } from 'recoil';
import { useRecoilState } from 'recoil';

const userState = atom({
    key: 'userState',
    default: {
        userName: "",
        brand: "",
        email: "",
    },
});

export const useUser = () => {
    const [user, setUser] = useRecoilState(userState);

    return {
        user,
        setUser,
    };
};
