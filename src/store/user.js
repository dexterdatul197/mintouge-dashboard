import { atom, selector, useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';

const userState = atom({
    key: 'userStateKey',
    default: {
        userName: "",
        brand: "",
        email: "",
    },
});

const avatarState = selector({
    key: 'avatarStateKey',
    get: ({ get }) => {
        const userName = get(userState).userName;
        const seed = userName ? userName[0] : "";
        let url = `https://api.dicebear.com/5.x/initials/svg?seed=${seed}&fontSize=${12}&fontWeight=${500}&backgroundColor=${'cyan'}`;
        return url;
    }
});

export const useUser = () => {
    const [user, setUser] = useRecoilState(userState);
    const avatar = useRecoilValue(avatarState);
    return {
        user,
        avatar,
        setUser,
    };
};
