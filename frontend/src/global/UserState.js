import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserState = atom({
  key: "userState",
  default: {
    nickname: "",
    profile: "",
    accessToken: "",
    email: "",
    domain: "",
    isLoggedIn: false,
    userId: "",
    mainBadge: "",
    notificationFlag: true,
  },
  effects_UNSTABLE: [persistAtom],
});
