import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { useUserAccessToken } from '../hooks/useUserAccessToken';

const { persistAtom } = recoilPersist();

export const UserState = atom({
    key: "userState",
    default: {
        nickname: "",
        profile: "",
        accessToken: "",
        email: "",
        domain: "",
    },
    effects_UNSTABLE: [persistAtom],
});