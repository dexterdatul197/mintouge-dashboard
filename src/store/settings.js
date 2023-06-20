import { atom } from 'recoil';
import { useRecoilState } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {},
});

export const useUser = () => {
    const user = useRecoilState(userState);
    return {
        user
    };
};
