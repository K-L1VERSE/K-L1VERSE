import { useRecoilState } from "recoil";
import { UserState } from "../global/UserState";

export const useUserAccessToken = () => {
  const [user] = useRecoilState(UserState);

  return user.accessToken || null;
};
