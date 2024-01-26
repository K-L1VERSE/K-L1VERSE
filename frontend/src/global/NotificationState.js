import { atom, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const NotificationState = atom({
    key: "notificationState",
    default: {
        notifications: [],
        newNotifications: [],
    },
    effects_UNSTABLE: [persistAtom],
});
